require "json"
require 'rest_client'

class Portainer
  attr_accessor :authorization_token, :base_url, :endpoint, :logger

  def initialize(base_url, endpoint)
    self.base_url = base_url
    self.endpoint = endpoint.to_s
    self.logger = Logger.new("#{Rails.root}/log/portainer.log")
  end

  def login

    user_portainer = ENV.fetch("PORTAINER_USER")

    password_portainer = ENV.fetch("PORTAINER_PASSWORD")

    self.logger.debug user_portainer

    self.logger.debug password_portainer


    url = self.base_url + '/api/auth'

    begin

      response = RestClient.post(url,
                                 {
                                   :Username => user_portainer,
                                   :Password => password_portainer
                                 }.to_json,
                                 {
                                   :content_type => 'application/json',
                                   "Cache-Control" => 'no-cache'
                                 }
      )

    rescue RestClient::ExceptionWithResponse => e
      self.logger.debug e.response
      exit 1
    end

    result = JSON.parse(response.body)
    self.authorization_token = "Bearer " + result["jwt"]

  end

  def pull_image(docker_image, docker_image_version)
    url = self.base_url + "/api/endpoints/" + self.endpoint + "/docker/images/create?fromImage=" + docker_image + ":" + docker_image_version

    begin
      RestClient.post(url, {}.to_json, {
        :content_type => 'application/json',
        :Authorization => self.authorization_token,
        "Cache-Control" => 'no-cache'
      })
    rescue RestClient::ExceptionWithResponse => e
      self.logger.debug e.response
    end
  end

  def find_container_by_name(container_name)
    url = self.base_url + '/api/endpoints/' + self.endpoint + '/docker/containers/json?filters={"name":["' + container_name + '"]}'

    response = RestClient::Request.execute(method: :get, url: url, headers: {
      :Authorization => self.authorization_token,
      "Cache-Control" => 'no-cache'
    })

    JSON.parse(response.body)

  end

  def _create_container(container_name, docker_image, docker_image_version, ports, environment_vars, restart_policy)
    url = self.base_url + "/api/endpoints/" + self.endpoint + "/docker/containers/create"

    ports_bindings = {}

    ports.split(',').each do |p|

      port_key = p.split(':')[0] + "/tcp"

      ports_bindings[port_key] = [
        {
          :HostPort => p.split(':')[1]
        }
      ]

    end

    body = {
      :Domainname => container_name,
      :Hostname => container_name,
      :Env => environment_vars,
      :Image => docker_image + ":" + docker_image_version,
      :HostConfig => {
        :AutoRemove => false,
        :NetworkMode => "bridge",
        :PortBindings => ports_bindings,
        :Privileged => false,
        :PublishAllPorts => false,
        :ReadonlyRootfs => false,
        :RestartPolicy => {
          :MaximumRetryCount => 0,
          :Name => restart_policy
        }
      }
    }

    container_id = nil

    begin
      response = RestClient.post(url, body.to_json, {
        :content_type => 'application/json',
        :params => {:name => container_name},
        :Authorization => self.authorization_token,
        "Cache-Control" => 'no-cache'
      })

      result = JSON.parse(response.body)

      container_id = result["Id"]

    rescue RestClient::ExceptionWithResponse => e
      self.logger.debug e.response
    end

    container_id

  end

  def _start_container(container_id)
    url = self.base_url + "/api/endpoints/" + self.endpoint + "/docker/containers/" + container_id + "/start"

    RestClient.post(url, {}.to_json, {
      :content_type => 'application/json',
      :Authorization => self.authorization_token,
      "Cache-Control" => 'no-cache'
    })
  end

  def _remove_container(container_id)
    url = self.base_url + "/api/endpoints/" + self.endpoint + "/docker/containers/" + container_id

    RestClient::Request.execute(method: :delete, url: url, headers: {
      :params => {force: 'true'},
      :Authorization => self.authorization_token,
      "Cache-Control" => 'no-cache'
    })
  end

  def deploy_container(container_name, docker_image, docker_image_version, ports, environment_vars, restart_policy)

    containers_list = find_container_by_name(container_name)

    if containers_list.size > 0
      _remove_container(containers_list[0]['Id'])
    end

    pull_image(docker_image, docker_image_version)

    container_id = _create_container(container_name, docker_image, docker_image_version, ports, environment_vars,restart_policy)

    if container_id

      _start_container(container_id)

    end

  end

  def prune_images
    url = self.base_url + "/api/endpoints/" + self.endpoint + '/docker/images/prune?filters={"dangling":["false"]}'

    RestClient.post(url, nil, {
      :Authorization => self.authorization_token,
      "Cache-Control" => 'no-cache',
    })
  end

end