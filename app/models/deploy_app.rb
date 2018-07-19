class DeployApp < ApplicationRecord
  belongs_to :deploy
  belongs_to :app
  belongs_to :app_version
  belongs_to :deploy_setup
  has_many :deploy_app_environment_var

  def set_deploy_app_env_vars (deploy_setup_id)

    DeploySetupItem.where(deploy_setup_id: deploy_setup_id).each do |dsi|

      daev = DeployAppEnvironmentVar.new

      daev.key = dsi.environment_var.key
      daev.value = dsi.environment_var.body

      daev.deploy_app = self

      daev.save()

    end

  end

end
