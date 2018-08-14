class Api::V1::EnvironmentVarsController < Api::V1::BaseController
  def index

    app_id = params[:app] && params[:app] != "null" ? params[:app] : nil
    environment_id = params[:environment] && params[:environment] != "null" ? params[:environment] : nil

    environment_vars = EnvironmentVar.all
    environment_vars = environment_vars.where(app_id: app_id)
    environment_vars = environment_vars.where(environment_id: environment_id)

    render json: environment_vars.to_json(:include => [:app, :environment])

  end

  def create
    respond_with :api, :v1, EnvironmentVar.create(environment_env_params)
  end

  def destroy
    respond_with EnvironmentVar.find(params[:id]).delete
  end

  def update
    environment_item = EnvironmentVar.find(params["id"])
    environment_item.update_attributes(environment_env_params)
    respond_with environment_item, json: environment_item.to_json(:include => [:app, :environment])
  end

  private

    def environment_env_params
      params.require(:environment_var).permit(:id, :key, :body, :app_id, :environment_id)
    end
end