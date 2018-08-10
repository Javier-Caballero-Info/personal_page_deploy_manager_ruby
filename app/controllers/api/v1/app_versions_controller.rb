class Api::V1::AppVersionsController < Api::V1::BaseController

  def index
    app_id = params[:app] && params[:app] != "null" ? params[:app].to_i : nil
    app_versions = AppVersion.all.where(deleted: false).order('id DESC')
    app_versions = app_versions.where(app_id: app_id)

    render json: app_versions.to_json(:include => [:app])

  end

  def update

    app_id = params[:app] && params[:app] != "null" ? params[:app].to_i : nil

    unless app_id
      App.all.each do |a|
        tags = DockerHub.get_tags(a.docker_image)
        # create new tags
        # mark as deleted removed tags
        tags.each do |t|
        end
      end
    end

    render json: {
      message: "In process"
    }.to_json, status: 202
  end

end