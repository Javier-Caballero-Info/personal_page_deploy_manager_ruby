class DeploySetup < ApplicationRecord
  belongs_to :environment
  belongs_to :app_version
  has_many :deploy_setup_item

  def copy_configuration_from(deploy_setup)

    puts 'Copied from ' + deploy_setup.id.to_s

    deploy_setup.deploy_setup_item.each do |i|
      DeploySetupItem.create!({deploy_setup_id: self.id, environment_var_id: i.environment_var_id})
    end
  end

end
