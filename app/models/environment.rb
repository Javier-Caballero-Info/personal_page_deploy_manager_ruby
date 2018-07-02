class Environment < ApplicationRecord
  has_many :environment_var
  validates :name, presence: true
  validates :name, uniqueness: true
  validates :portainer_url, presence: true
end
