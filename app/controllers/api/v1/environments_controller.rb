class Api::V1::EnvironmentsController < Api::V1::BaseController
  def index
    respond_with Environment.all
  end

  def create
    respond_with :api, :v1, Environment.create(environment_params)
  end

  def destroy
    respond_with Environment.destroy(params[:id])
  end

  def update
    environment_item = Environment.find(params["id"])
    environment_item.update_attributes(environment_params)
    respond_with environment_item, json: environment_item
  end

  private

    def environment_params
      params.require(:environment).permit(:id, :name, :portainer_url)
    end
end