class DeployAppEnvironmentVar
  include Mongoid::Document

  field :key, type: String
  field :value, type: String

  belongs_to :deploy_app
end
