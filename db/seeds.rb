
Environment.create!([
                      {
                        name: 'Production',
                        portainer_url: 'https://portainer.javiercaballero.info',
                        endpoint_id: 0
                      },
                      {
                        name: 'Stage',
                        portainer_url: 'http://188.166.96.202:9000',
                        endpoint_id: 0
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

EnvironmentVar.create!([
                        {
                          key: 'GLOBAL_VAR_1',
                          body: '1'
                        },
                        {
                          key: 'GLOBAL_VAR_2',
                          body: '2'
                        }
                       ])

Environment.all.each do |e|

  EnvironmentVar.create!({
                             key: "VAR_#{e.name.upcase}_1",
                             body: '1',
                             environment_id: e.id
                           })

  App.all.each_with_index do |a, j|
    EnvironmentVar.create!({
                             key: "VAR_#{a.name.to_s.upcase.gsub(' ', '_').gsub('-', '')}_#{e.name.upcase}_#{j.to_s}",
                             body: j.to_s,
                             environment_id: e.id,
                             app_id: a.id
                           })
  end

end

App.all.each do |a|

  %w(1.0.0 1.0.1 1.2.0).each do |v|

    AppVersion.create!({
                        name: v,
                        deleted: false,
                        app_id: a.id,
                        stable: 0
                      })

  end

end