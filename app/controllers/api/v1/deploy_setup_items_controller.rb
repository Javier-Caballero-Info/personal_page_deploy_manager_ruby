class Api::V1::DeploySetupItemsController < Api::V1::BaseController
  def index
    respond_with DeploySetupItem.all
  end

  def create
    deploy_setup_item = DeploySetupItem.new(deploy_setup_params)

    deploy_setup = DeploySetup.find(params[:deploy_setup_item][:deploy_setup_id])

    deploy_setup_item.deploy_setup = deploy_setup

    deploy_setup_item.save

    render json: deploy_setup_item.to_json(:include => [:environment_var])
  end

  def destroy

    ds = DeploySetup.where(:'deploy_setup_item._id' => BSON::ObjectId(params[:id])).first

    ds.deploy_setup_item.each do |dsi|

      if dsi.id == params[:id]
            dsi.delete!
            respond_with dsi
      end

    end

  end

  def update
    deploy_setup_item = DeploySetupItem.find(params["id"])
    deploy_setup_item.update_attributes(deploy_setup_params)
    respond_with deploy_setup_item, json: deploy_setup_item
  end

  private

    def deploy_setup_params
      params.require(:deploy_setup_item).permit(:id, :environment_var_id)
    end
end