class AppVersion
  include Mongoid::Document

  field :name, type: String
  field :deleted, type: Boolean
  field :stable, type: Boolean

  belongs_to :app

  validates :name, presence: true

end
