class Api::V1::DeploysController < Api::V1::BaseController
  def index
    render json: Deploy.all.to_json(:include => [:environment])
  end

  def create
    respond_with :api, :v1, Deploy.create(deploy_params)
  end

  def destroy
    respond_with Deploy.destroy(params[:id])
  end

  def update
    deploy_item = Deploy.find(params["id"])
    deploy_item.update_attributes(deploy_params)
    respond_with deploy_item, json: deploy_item
  end

  private

    def deploy_params
      params.require(:deploy).permit(:id, :name, :environment_id, :status)
    end
end