class DeploySetup < ApplicationRecord
  belongs_to :environment
  belongs_to :app_version
  has_many :deploy_setup_item, :dependent => :destroy

  def copy_configuration_from(deploy_setup)

    self.restart_policy = deploy_setup.restart_policy
    self.ports = deploy_setup.ports
    self.save

    deploy_setup.deploy_setup_item.each do |i|
      DeploySetupItem.create!({deploy_setup_id: self.id, environment_var_id: i.environment_var_id})
    end
  end

end
