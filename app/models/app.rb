class App
  include Mongoid::Document
  
  field :name, type: String
  field :docker_image, type: String
  field :exposed_ports, type: String
  field  :description, type: String

  has_many :environment_var

  validates :name, presence: true
  validates :name, uniqueness: true

  validates :docker_image, presence: true

  def update_app_versions
    tags_register = DockerHub.get_tags(self.docker_image)

    tags_db = AppVersion.where(app_id: self.id).map{|v| v.name}

    new_tags = tags_register - tags_db

    new_tags.each do |t|
      av = AppVersion.new(
        app_id: self.id,
        name: t,
        deleted: false
      )
      av.save
    end

    removed_tags = tags_db - tags_register

    removed_tags.each do |t|
      av = AppVersion.where(name: t, app_id: self.id).first
      if av != nil
        av.deleted = true
        av.save
      end
    end
  end

end
