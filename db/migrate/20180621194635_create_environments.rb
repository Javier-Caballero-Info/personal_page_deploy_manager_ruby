class CreateEnvironments < ActiveRecord::Migration[5.2]
  def change
    create_table :environments do |t|
      t.string :name
      t.string :portainer_url
      t.integer :endpoint_id
      t.timestamps
    end
  end
end
