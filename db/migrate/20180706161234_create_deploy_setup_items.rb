class CreateDeploySetupItems < ActiveRecord::Migration[5.2]
  def change
    create_table :deploy_setup_items do |t|
      t.references :deploy_setup, foreign_key: true
      t.references :environment_var, foreign_key: true
      t.timestamps
    end
  end
end
