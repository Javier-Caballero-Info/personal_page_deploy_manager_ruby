class EnvironmentVar
  include Mongoid::Document

  field :key, type: String
  field :body, type: String

  belongs_to :app, required: false
  belongs_to :environment, required: false
end
