class Environment
  include Mongoid::Document

  field :name, type: String
  field :portainer_url, type: String
  field :endpoint_id, type: Integer

  has_many :environment_var

  validates :name, presence: true
  validates :name, uniqueness: true
  validates :portainer_url, presence: true
end
