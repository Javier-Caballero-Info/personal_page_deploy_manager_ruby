class DeploySetupItem < ApplicationRecord
  belongs_to :deploy_setup
  belongs_to :environment_var
end
