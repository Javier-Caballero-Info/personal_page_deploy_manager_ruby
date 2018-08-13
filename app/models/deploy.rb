class Deploy < ApplicationRecord
  belongs_to :environment
  has_many :deploy_app, :dependent => :destroy

  def perform_deploy

      begin
        portainer = Portainer.new(self.environment.portainer_url, self.environment.endpoint_id)

        portainer.login

        self.deploy_app.each do |da|

          environment_vars = []

          DeployAppEnvironmentVar.where(deploy_app_id: da.id).each do |da_ev|
            environment_vars.push(da_ev.key + '=' + da_ev.value)
          end

          portainer.deploy_container(
            da.container_name,
            da.app.docker_image,
            da.app_version.name,
            da.ports,
            environment_vars,
            da.restart_policy
          )

        end

        portainer.prune_images

        self.status = 'finished'
        self.save

      rescue Exception
        self.status = 'failed'
        self.save
      end

  end

end
