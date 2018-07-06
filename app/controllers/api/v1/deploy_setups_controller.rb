class Api::V1::DeploySetupsController < Api::V1::BaseController
  def index

    app_version_id = params[:app_version] && params[:app_version] != "null" ? params[:app_version].to_i : nil
    environment_id = params[:environment] && params[:environment] != "null" ? params[:environment].to_i : nil

    if app_version_id && environment_id
      respond_with DeploySetup.all
                     .where(environment_id: environment_id, app_version_id: app_version_id)
                     .to_json(:include => {
                       :deploy_setup_item => { :include => [:environment_var] }
                       })
    else
      render json: {:message => 'App version and environment are required'}, status: 400
    end

  end

  def create
    respond_with :api, :v1, DeploySetup.create(deploy_setup_params)
  end

  def destroy
    respond_with DeploySetup.destroy(params[:id])
  end

  def update
    deploy_setup_item = DeploySetup.find(params["id"])
    deploy_setup_item.update_attributes(deploy_setup_params)
    respond_with deploy_setup_item, json: deploy_setup_item
  end

  private

    def deploy_setup_params
      params.require(:deploy_setup).permit(:id, :app_version_id, :environment_id)
    end
end