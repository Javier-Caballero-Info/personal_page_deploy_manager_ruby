class DockerHub

  def self.get_tags(docker_image)
    tags = []

    url = "https://hub.docker.com/v2/repositories/" + docker_image + "/tags/?page_size=20"

    loop do

      response = RestClient.get(url,
                                {
                                  :content_type => 'application/json',
                                  "Cache-Control" => 'no-cache'
                                }
      )

      result = JSON.parse(response.body)

      #puts result

      result['results'].each do |r|
        tags.push(r['name'])
      end

      break if result['next'] == nil

      url = result['next']

    end

    tags.reverse!

  end
end