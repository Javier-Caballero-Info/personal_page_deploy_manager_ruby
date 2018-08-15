class DeployApp
  include Mongoid::Document

  field :ports, default: '', type: String
  field :restart_policy, type: String
  field :container_name, type: String

  belongs_to :app
  belongs_to :app_version
  belongs_to :deploy_setup

  embedded_in :deploy
  embeds_many :deploy_app_environment_var

  def set_deploy_app_env_vars (deploy_setup_id)

    deploy_app_env_vars =  []

    deploy_setup = DeploySetup.find(deploy_setup_id)

    if deploy_setup != nil

      deploy_setup.deploy_setup_item.each do |dsi|

        daev = DeployAppEnvironmentVar.new

        daev.key = dsi.environment_var.key
        daev.value = dsi.environment_var.body

        daev.deploy_app = self

        daev.save!

        deploy_app_env_vars.append(daev)

      end

      self.deploy_app_environment_var = deploy_app_env_vars

      self.save!

    end

  end

end
