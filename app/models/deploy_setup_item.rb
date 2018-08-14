class DeploySetupItem
  include Mongoid::Document
  belongs_to :deploy_setup
  belongs_to :environment_var
end
