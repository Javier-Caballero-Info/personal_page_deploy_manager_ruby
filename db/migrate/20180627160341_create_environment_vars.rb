class CreateEnvironmentVars < ActiveRecord::Migration[5.2]
  def change
    create_table :environment_vars do |t|
      t.string :key
      t.text :body
      t.references :app, foreign_key: true, not_null: false
      t.references :environment, foreign_key: true, not_null: false
      t.timestamps
    end
  end
end
