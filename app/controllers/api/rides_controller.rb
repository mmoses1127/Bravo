class Api::RidesController < ApplicationController

  # before_action :require_logged_in, only: [:show, :create, :update, :destroy]

  def index
    if params[:user_id]
      @rides = Ride.where(athlete: params[:user_id])
    else
      @rides = Ride.all
      render :index      
    end
  end

  def show
    @ride = Ride.find_by(id: params[:id])
    if @ride
      render :show
    end
  end

  def create
    @ride = Ride.new(ride_params)
    if @ride.save!
      render :show
    else
      render json: { errors: @ride.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @ride = Ride.find_by(id: params[:id])
    if @ride.update!(ride_params)
      render :show
    else
      render json: { errors: @ride.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @ride = Ride.find_by(id: params[:id])
    if @ride.destroy!
      render :show
    else
      render json: { errors: ['Cannot delete ride'] }, status: :unprocessable_entity
    end
  end

  private

  def ride_params
    params.require(:ride).permit(:date_time, :athlete_id, :title, :description, :distance, :duration, :elevation, :gps_points, :polyline, photos: [])
  end

end
