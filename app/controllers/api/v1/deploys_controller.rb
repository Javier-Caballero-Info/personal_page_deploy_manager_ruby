class Api::V1::DeploysController < Api::V1::BaseController

  def index

    result = Deploy.all

    render json: result, include: [
      :environment
    ]
  end

  def show
    render json: Deploy.find(params["id"]), include: [
      :environment,
      :app,
      :app_version,
      :deploy_app_environment_var]
  end

  def create

    deploy_item = Deploy.new(deploy_params)

    exist_others_deploy_in_progress = Deploy.where(
      status: 'in_progress',
      environment_id: deploy_params[:environment_id]
    ).size > 0

    deploy_item.status = exist_others_deploy_in_progress || deploy_params[:status] == 'draft' ? 'draft' : 'in_progress'

    deploy_item.name = Environment.find(deploy_params[:environment_id]).name + '#'  + DateTime.now.strftime('%Y%m%d%H%M%S')

    deploy_apps = []

    deploy_item.save

    params[:deploy][:deploy_apps].each do |_, da|

      deploy_app_item = DeployApp.new(da.permit(:app_id, :app_version_id, :deploy_setup_id))
      deploy_app_item.deploy = deploy_item
      deploy_app_item.container_name = App.find(da[:app_id]).name
      deploy_app_item.restart_policy = da[:deploy_setup][:restart_policy]
      deploy_app_item.ports = da[:deploy_setup][:ports]

      deploy_app_item.save()

      deploy_app_item.set_deploy_app_env_vars(da[:deploy_setup_id])

      deploy_app_item.save()

    end

    if deploy_item.status != 'draft'
      deploy_item.delay.perform_deploy
    end

    render json:
             deploy_item.to_json(:include => [:environment, :deploy_app]),
           status: exist_others_deploy_in_progress ? 400 : 201

  end

  def destroy

    deploy_item = Deploy.find(params["id"])

    if deploy_item.status == 'draft'
      Deploy.find(params[:id]).delete
      render json: nil, status: 200
    else
      render json: nil, status: 400
    end

  end

  def update

    deploy_item = Deploy.find(params[:deploy]["id"])

    exist_others_deploy_in_progress = Deploy.where(
      status: 'in_progress',
      environment_id: params[:deploy][:environment_id]["$oid"]
    ).size > 0

    deploy_item.status = exist_others_deploy_in_progress || deploy_params[:status] == 'draft' ? 'draft' : 'in_progress'

    deploy_item.environment = Environment.find(params[:deploy][:environment_id]["$oid"])

    deploy_item.save

    DeployApp.where(deploy: deploy_item).each { |da| da.delete }

    params[:deploy][:deploy_apps].each do |_, da|

      app = App.find(da[:app_id]["$oid"])

      deploy_app_item = DeployApp.new(da.permit(:app_id, :app_version_id, :deploy_setup_id))
      deploy_app_item.deploy = deploy_item
      deploy_app_item.app = app
      deploy_app_item.container_name = app.name
      deploy_app_item.restart_policy = da[:deploy_setup][:restart_policy]
      deploy_app_item.ports = da[:deploy_setup][:ports]

      deploy_app_item.save()

      deploy_app_item.set_deploy_app_env_vars(da[:deploy_setup_id])

      deploy_app_item.save()

    end

    if deploy_item.status != 'draft'
      deploy_item.perform_deploy
    end

    render json:
             deploy_item.to_json(:include => [:environment, :deploy_app]),
           status: exist_others_deploy_in_progress ? 400 : 200

  end

  private

    def deploy_params
      params.require(:deploy).permit(:name, :environment_id, :status)
    end
end