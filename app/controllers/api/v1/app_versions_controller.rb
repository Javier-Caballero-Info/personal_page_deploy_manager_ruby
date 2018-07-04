class Api::V1::AppVersionsController < Api::V1::BaseController
  def index
    app_id = params[:app] && params[:app] != "null" ? params[:app].to_i : nil
    app_versions = AppVersion.all.where(deleted: false).order('id DESC')
    app_versions = app_versions.where(app_id: app_id)

    render json: app_versions.to_json(:include => [:app])

  end

  def create
    respond_with :api, :v1, AppVersion.create(app_version_params)
  end

  def destroy
    respond_with AppVersion.destroy(params[:id])
  end

  def update
    app_version_item = AppVersion.find(params["id"])
    app_version_item.update_attributes(app_version_params)
    respond_with app_version_item, json: app_version_item
  end

  private

    def app_version_params
      params.require(:app_version).permit(:id, :name)
    end
end