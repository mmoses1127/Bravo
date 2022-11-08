class Api::KudosController < ApplicationController

  # before_action :require_logged_in, only: [:create, :destroy]

  def create
    @ride = Ride.find_by(id: params[:kudo][:ride_id])
    @kudo = Kudo.new(kudo_params)
    # @kudos = Kudo.all
    if @kudo.save!
      render :show
    else
      render json: { errors: @kudo.errors.full_messages }, status: :unprocessable_entity;
    end
  end

  def destroy
    @kudo = Kudo.find_by(id: params[:id])
    @kudo.destroy!
    @kudos = Kudo.all
    render :index
  end

  def index
    # @kudos = Kudo.all.where(ride_id: params[:kudo][:ride_id])
    @kudos = Kudo.all 
    if @kudos
      render :index
    else
      render json: { errors: @kudos.errors.full_messages }, status: :unprocessable_entity;
    end
  end

  private

  def kudo_params
    params.require(:kudo).permit(:ride_id, :giver_id)
  end

end
