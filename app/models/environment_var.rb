class EnvironmentVar < ApplicationRecord
  belongs_to :app, required: false
  belongs_to :environment, required: false
end
