class CreateDeploySetups < ActiveRecord::Migration[5.2]
  def change
    create_table :deploy_setups do |t|
      t.references :environment, foreign_key: true
      t.references :app_version, foreign_key: true

      t.timestamps
    end
  end
end
