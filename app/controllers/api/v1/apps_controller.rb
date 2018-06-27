class Api::V1::AppsController < Api::V1::BaseController
  def index
    respond_with App.all
  end

  def create
    respond_with :api, :v1, App.create(app_params)
  end

  def destroy
    respond_with App.destroy(params[:id])
  end

  def update
    app_item = App.find(params["id"])
    app_item.update_attributes(app_params)
    respond_with app_item, json: app_item
  end

  private

    def app_params
      params.require(:app).permit(:id, :name, :description, :docker_image, :exposed_ports)
    end
end