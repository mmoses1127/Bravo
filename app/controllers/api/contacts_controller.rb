class Api::ContactsController < ApplicationController
  def create
    @contact = Contact.new(contact_params)
    if @contact.save!
      @contacts = Contact.all
      render :show
    else
      render json: {errors: @contact.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @contact = Contact.find_by(id: params[:id])
    if @contact.update(contact_params)
      render :show
    else
      render json: {errors: @contact.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @contact = Contact.find_by(id: params[:id])
    @contact.destroy!
    @contacts = Contact.all
    render :index
  end

  def index
    @contacts = Contact.all
    # .where(user_id: current_user.id)
    if @contacts
      render :index
    else
      render json: { errors: ['No contacts to show'] }, status: :unprocessable_entity
    end
  end

  def show
    @contact = Contact.find_by(id: params[:id])
    if @contact
      render :show
    end
  end


  private

  def contact_params
    params.require(:contact).permit(:date_connected, :id, :company, :title, :connection_description, :first_name, :last_name, :email, :phone_number, :user_id, :status_id)
  end

end
