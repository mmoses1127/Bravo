class Api::TiersController < ApplicationController

  def index
    @tiers = Tier.all
    render :index      
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
      render :index
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
    params.require(:tier).permit(:user_id, :position, :name, :id)
  end

end
