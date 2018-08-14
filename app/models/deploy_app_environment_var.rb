class DeployAppEnvironmentVar
  include Mongoid::Document

  field :key, type: String
  field :value, type: String

  embedded_in :deploy_app
end
