class Environment < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true
  validates :portainer_url, presence: true
end
