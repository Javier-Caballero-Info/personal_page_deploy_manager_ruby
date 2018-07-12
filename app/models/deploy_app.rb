class DeployApp < ApplicationRecord
  belongs_to :deploy
  belongs_to :app
  belongs_to :app_version
  belongs_to :deploy_setup
end
