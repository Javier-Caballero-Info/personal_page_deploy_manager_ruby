Rails.application.routes.draw do
  # devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'site#index'

  get '/environments', to: 'site#environments'
  get '/apps', to: 'site#apps'
  get '/global_env_vars', to: 'site#global_env_vars'
  get '/deploys', to: 'site#deploys'

  namespace :api do
    namespace :v1 do
      resources :apps, only: [:index, :create, :destroy, :update]
      resources :environments, only: [:index, :create, :destroy, :update]
      resources :environment_vars, only: [:index, :create, :destroy, :update]
      resources :deploys, only: [:index, :create, :destroy, :update, :show]
      resources :deploy_setups, only: [:index, :create, :update]
      resources :deploy_setup_items, only: [:create, :destroy]
      resources :app_versions, only: [:index]
      match 'app_versions', to: 'app_versions#update', via: :put
    end
  end

  #devise_for :users, controllers: { sessions: 'users/sessions' }
"""
  devise_for :users,
             path: 'auth',
             path_names:
                 {
                     sign_in: 'login', sign_out: 'logout',
                     password: 'secret', confirmation: 'verification', unlock: 'unblock',
                     registration: 'register', sign_up: 'cmon_let_me_in'
                 }
"""
  devise_for :users,
             path: 'auth',
             path_names: {sign_in: 'login', sign_out: 'logout'}

  resources :users

end
