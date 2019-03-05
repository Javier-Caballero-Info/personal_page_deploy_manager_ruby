class SecurityController < ApplicationController

  before_action :authorize

  # Make the current_user method available to views also, not just controllers:
  helper_method :current_user

  # Define the current_user method:
  def current_user
    if session['warden.user.user.key']
      @current_user ||= User.find(session['warden.user.user.key'][0][0])
    else
      @current_user = nil
    end
  end

  def check_auth
    authenticate_or_request_with_http_basic do |username,password|
      user = User.where(email: username).first
      if !user.nil? && user.valid_password?(password)
        sign_in :user, user
      else
        render html: 'HTTP Basic: Access denied.', status: 401
      end
    end
  end

  def authorize
      if !session['warden.user.user.key'] && request.format.json?
        check_auth
      else
        cookies[:username] = current_user ? current_user.full_name : 'guest'
        redirect_to new_user_session_path, alert: 'You must be logged in to access this page.' if current_user.nil?
      end
  end

end
