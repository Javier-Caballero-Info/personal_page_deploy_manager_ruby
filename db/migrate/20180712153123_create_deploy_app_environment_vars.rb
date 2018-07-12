class CreateDeployAppEnvironmentVars < ActiveRecord::Migration[5.2]
  def change
    create_table :deploy_app_environment_vars do |t|
      t.references :deploy_app, foreign_key: true
      t.string :key
      t.text :value

      t.timestamps
    end
  end
end
