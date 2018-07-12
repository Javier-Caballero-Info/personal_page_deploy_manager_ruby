class CreateDeployApps < ActiveRecord::Migration[5.2]
  def change
    create_table :deploy_apps do |t|
      t.references :deploy, foreign_key: true
      t.references :app, foreign_key: true
      t.references :app_version, foreign_key: true
      t.references :deploy_setup, foreign_key: true
      t.string :ports, default: ''
      t.string :restart_policy
      t.string :container_name
      t.timestamps
    end
  end
end
