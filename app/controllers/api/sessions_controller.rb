class Api::SessionsController < ApplicationController
  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:destroy]

  def show
    @user = current_user
    if @user
      # render json: { user: @user }
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])

    if @user 
      login!(@user)
      # render json: { user: @user } 
      render 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.']}, status: 422
    end
  end

  def destroy
      logout!
      render json: { message: 'success' }
      # head :no_content #something we can return
  end
end
