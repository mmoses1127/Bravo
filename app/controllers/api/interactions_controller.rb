class Api::InteractionsController < ApplicationController

  def create
    @interaction = Interaction.new(interaction_params)
    if @interaction.save!
      @interactions = Interaction.all
      render :show
    else
      render json: {errors: @interaction.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @interaction = Interaction.find_by(id: params[:id])
    if @interaction.update(interaction_params)
      render :show
    else
      render json: {errors: @interaction.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @interaction = Interaction.find_by(id: params[:id])
    @interaction.destroy!
    @interactions = Interaction.all
    render :index
  end

  def index
    @interactions = Interaction.all
    # .where(user_id: current_user.id)
    if @interactions
      render :index
    else
      render json: { errors: ['No interactions to show'] }, status: :unprocessable_entity
    end
  end

  def show
    @interaction = Interaction.find_by(id: params[:id])
    if @interaction
      render :show
    end
  end


  private

  def interaction_params
    params.require(:interaction).permit(:date_contacted, :contact_method, :next_contact_date, :notes, :contact_id, :user_id)
  end

end
