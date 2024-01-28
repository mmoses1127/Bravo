class Api::TiersController < ApplicationController

  def index
    if params[:user_id]
      @tiers = Tier.where(user: params[:user_id])
    else
      @tiers = Tier.all
      render :index      
    end
  end

  def show
    @tier = Tier.find_by(id: params[:id])
    if @tier
      render :show
    end
  end

  def create
    @tier = Tier.new(tier_params)
    if @tier.save!
      render :show
    else
      render json: { errors: @tier.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @tier = Tier.find_by(id: params[:id])
    if @tier.update!(tier_params)
      render :show
    else
      render json: { errors: @tier.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @tier = Tier.find_by(id: params[:id])
    if @tier.destroy!
      render :show
    else
      render json: { errors: ['Cannot delete tier'] }, status: :unprocessable_entity
    end
  end

  private

  def tier_params
    params.require(:tier).permit(:user_id, :position, :name)
  end

end
