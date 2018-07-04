class CreateAppVersions < ActiveRecord::Migration[5.2]
  def change
    create_table :app_versions do |t|
      t.string :name
      t.boolean :deleted
      t.references :app, foreign_key: true
      t.integer :stable

      t.timestamps
    end
  end
end
