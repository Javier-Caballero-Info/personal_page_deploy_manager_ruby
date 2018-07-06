class DeploySetup < ApplicationRecord
  belongs_to :environment
  belongs_to :app_version
  has_many :deploy_setup_item
end
