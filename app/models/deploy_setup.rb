class DeploySetup
  include Mongoid::Document

  field :restart_policy, type: String
  field :ports, default: '', type: String

  belongs_to :environment
  belongs_to :app_version
  embeds_many :deploy_setup_item

  def copy_configuration_from(deploy_setup)

    self.restart_policy = deploy_setup.restart_policy
    self.ports = deploy_setup.ports
    self.save

    deploy_setup.deploy_setup_item.each do |i|
      DeploySetupItem.create!({deploy_setup_id: self.id, environment_var_id: i.environment_var_id})
    end
  end

end
