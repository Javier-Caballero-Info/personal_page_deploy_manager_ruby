class Api::V1::DeploySetupItemsController < Api::V1::BaseController
  def index
    respond_with DeploySetupItem.all
  end

  def create
    deploy_setup_item = DeploySetupItem.create!(deploy_setup_params)
    render json: deploy_setup_item.to_json(:include => [:environment_var])
  end

  def destroy
    respond_with DeploySetupItem.destroy(params[:id])
  end

  def update
    deploy_setup_item = DeploySetupItem.find(params["id"])
    deploy_setup_item.update_attributes(deploy_setup_params)
    respond_with deploy_setup_item, json: deploy_setup_item
  end

  private

    def deploy_setup_params
      params.require(:deploy_setup_item).permit(:id, :deploy_setup_id, :environment_var_id)
    end
end