class DeelayedJob
  include Mongoid::Document

  field :priority, default: 0, type: Integer
  field :attempts, default: 0, type: Integer
  field :handler, type: String
  field :last_error, type: String
  field :run_at, type: DateTime
  field :locked_at, type: DateTime
  field :failed_at, type: DateTime
  field :locked_by, type: String
  field :queue, type: String

end