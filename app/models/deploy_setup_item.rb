class DeploySetupItem
  include Mongoid::Document

  embedded_in :deploy_setup

  belongs_to :environment_var

end
