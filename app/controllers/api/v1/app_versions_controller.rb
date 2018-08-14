class Api::V1::AppVersionsController < Api::V1::BaseController

  def index
    app_id = params[:app] && params[:app] != "null" ? params[:app] : nil
    app_versions = AppVersion.all.where(deleted: false).order('id DESC')
    app_versions = app_versions.where(app_id: app_id)

    render json: app_versions.to_json(:include => [:app])

  end

  def update

    app_id = params[:app] && params[:app] != "null" ? params[:app] : nil

    unless app_id

      App.all.each do |a|

        a.delay.update_app_versions

      end
    else
      app = App.find(app_id)
      if app != nil
        app.delay.update_app_versions
      end
    end

    render json: {
      message: "In process"
    }.to_json, status: 202
  end

end