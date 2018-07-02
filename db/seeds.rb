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

App.create!([
              {
                name: 'Admin API - NodeJs',
                docker_image: 'javiercaballeroinfo/personal_page_admin_crud_nodejs',
                exposed_ports: '3000'
              },
              {
                name: 'Web Page',
                docker_image: 'javiercaballeroinfo/personal_page_web_html',
                exposed_ports: '80'
              }
            ])
