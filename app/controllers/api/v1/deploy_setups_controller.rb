class Api::V1::DeploySetupsController < Api::V1::BaseController
  def index

    app_version_id = params[:app_version] && params[:app_version] != "null" ? params[:app_version] : nil
    environment_id = params[:environment] && params[:environment] != "null" ? params[:environment] : nil

    if app_version_id && environment_id
      respond_with DeploySetup.all
                       .where(environment_id: environment_id, app_version_id: app_version_id)
                       .to_json(:include => {
                           :deploy_setup_item => {:include => [:environment_var]}
                       })
    else
      render json: {:message => 'App version and environment are required'}, status: 400
    end

  end

  def create

    deploy_setup = DeploySetup.new(deploy_setup_params)
    deploy_setup.ports = ''

    if params[:copy_from] && params[:copy_from] == 'from_app_version'

      app_versions = AppVersion.where(
          app_id: deploy_setup.app_version.app_id,
          deleted: false
      ).to_a

      last_deploy_setup = DeploySetup
                              .where(
                                  environment_id: deploy_setup_params[:environment_id],
                                  app_version_id:  { "$in": app_versions}
                              )
                              .order('app_version_id DESC')

      if last_deploy_setup.size > 0
        deploy_setup.copy_configuration_from(last_deploy_setup.first)
      end

    end

    # deploy_setup.save!

    render json: deploy_setup.to_json(:include => {
        :deploy_setup_item => {:include => [:environment_var]}
    }), :template => false

  end

  def destroy
    respond_with DeploySetup.find(params[:id]).delete
  end

  def update
    deploy_setup_item = DeploySetup.find(params["id"])
    deploy_setup_item.update_attributes(deploy_setup_params)
    respond_with deploy_setup_item, json: deploy_setup_item
  end

  private

  def deploy_setup_params
    params.require(:deploy_setup).permit(:id, :app_version_id, :environment_id, :restart_policy, :ports)
  end
end