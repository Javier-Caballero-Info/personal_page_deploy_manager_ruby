class DeelayedJob
  include Mongoid::Document

  field table.integer :priority, default: 0, null: false, type: Integer
  field table.integer :attempts, default: 0, null: false, type: Integer
  field table.text :handler, null: false, type: String
  field table.text :last_error, type: String
  field table.datetime :run_at, type: DateTime
  field table.datetime :locked_at, type: DateTime
  field table.datetime :failed_at, type: DateTime
  field table.string :locked_by, type: String
  field table.string :queue, type: String

end