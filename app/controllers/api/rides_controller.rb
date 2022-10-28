class Api::RidesController < ApplicationController

  before_action :require_logged_in, only [:show, :create, :update, :destroy]

  def index
    @rides = Ride.all
    render :index
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

    end
  end

  def update
    @ride = Ride.find_by(id: params[:id])
    if @ride.update!(ride_params)
      render :show
    else

    end
  end

  def destroy
    @ride = Ride.find_by(id: params[:id])
    if @ride.destroy!
      render 'api/rides/index'
    else

    end
  end

  private

  def ride_params
    params.require(:ride).permit(:date_time, :title, :description, :distance, :moving_time, :elevation, :gpx_file_url)
  end

end
