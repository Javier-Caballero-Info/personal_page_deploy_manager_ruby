# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# 10.times { App.create!(name: "Item", description: "I am a description.") }

Environment.create!([
                      {
                        name: 'Production',
                        portainer_url: 'https://portainer.javiercaballero.info'
                      },
                      {
                        name: 'Stage',
                        portainer_url: 'http://188.166.96.202:9000'
                      }
                    ])
