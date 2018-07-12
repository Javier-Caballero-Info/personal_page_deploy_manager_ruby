class CreateDeploys < ActiveRecord::Migration[5.2]
  def change
    create_table :deploys do |t|
      t.string :name
      t.string :status
      t.references :environment, foreign_key: true

      t.timestamps
    end
  end
end
