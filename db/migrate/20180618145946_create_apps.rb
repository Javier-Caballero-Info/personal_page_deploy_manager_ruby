class CreateApps < ActiveRecord::Migration[5.2]
  def change
    create_table :apps do |t|
      t.string :name
      t.string :docker_image
      t.string :exposed_ports
      t.text :description
      t.timestamps
    end
  end
end
