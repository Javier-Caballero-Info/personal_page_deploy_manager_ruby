class Deploy < ApplicationRecord
  belongs_to :environment
  has_many :deploy_app
end
