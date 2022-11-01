class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  before_action :require_logged_out, only: [:create]

  def create
    @user = User.new(user_params)
    if @user.save 
      login!(@user)
      render `/dashboard`
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity;
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity;
    end
  end

  def index
    @users = User.all
    if @users
      render :index
    else
      render json: { errors: @users.errors.full_messages }, status: :unprocessable_entity;
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
