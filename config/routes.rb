Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'site#index'

  get '/environments', to: 'site#environments'
  get '/apps', to: 'site#apps'
  get '/global_env_vars', to: 'site#global_env_vars'

  namespace :api do
    namespace :v1 do
      resources :apps, only: [:index, :create, :destroy, :update]
      resources :environments, only: [:index, :create, :destroy, :update]
      resources :environment_vars, only: [:index, :create, :destroy, :update]
    end
  end
end
