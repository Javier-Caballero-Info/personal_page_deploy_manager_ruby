class Api::V1::DeploysController < Api::V1::BaseController

  def index
    render json: Deploy.all.to_json(:include => [
      :environment, :deploy_app => { :include => [:deploy_app_environment_var] }
    ])
  end

  def show
    render json: Deploy.find(params["id"]).to_json(:include => [
      :environment, :deploy_app => { :include => [:deploy_app_environment_var] }
    ])
  end

  def create

    deploy_item = Deploy.new(deploy_params)

    exist_others_deploy_in_progress = Deploy.where(
      status: 'in_progress',
      environment_id: deploy_params[:environment_id]
    ).size > 0

    deploy_item.status = exist_others_deploy_in_progress ? 'draft' : 'in_progress'

    deploy_item.name = Environment.find(deploy_item.environment_id).name + '#'  + DateTime.now.strftime('%Y%m%d%H%M%S')

    deploy_item.save()

    deploy_apps = []

    params[:deploy][:deploy_apps].each do |_, da|

      deploy_app_item = DeployApp.new(da.permit(:app_id, :app_version_id, :deploy_setup_id))
      deploy_app_item.deploy_id = deploy_item.id
      deploy_app_item.container_name = App.find(da[:app_id]).name
      deploy_app_item.restart_policy = da[:deploy_setup][:restart_policy]
      deploy_app_item.ports = da[:deploy_setup][:ports]

      deploy_app_item.save()

      deploy_app_item.set_deploy_app_env_vars(da[:deploy_setup_id])

      deploy_apps.append(deploy_app_item)

    end

    if exist_others_deploy_in_progress
      render json: deploy_item.to_json(:include => [:environment, :deploy_app]), status: 400
    else
      deploy_item.perform_deploy
      render json: deploy_item.to_json(:include => [:environment, :deploy_app])
    end

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