class KudosController < ApplicationController

  before_action :require_logged_in, only: [create, destroy]

  def create
    @ride = Ride.find_by(id: params[:kudo][:ride_id])
    @kudo = Kudo.new(kudo_params)
    if @kudo.save!
      render `api/rides/index`
    else
      render json: { errors: @kudo.errors.full_messages }, status: :unprocessable_entity;
    end
  end

  # def destroy
  #   @kudo = 
  # end

  def index
    @kudos = Kudo.all.where(ride_id: params[:kudo][:ride_id])
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
