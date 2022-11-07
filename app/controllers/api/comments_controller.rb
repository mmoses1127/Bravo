class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    if @comment.save!
      @comments = Comment.all
      render :index
    else
      render json: {errors: @comment.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def index
    @comments = Comment.all
    if @comments
      render :index
    else
      render json: { errors: ['No rides to show'] }, status: :unprocessable_entity
    end
  end

  def update

  end

  def destroy
    # @comment = Comment.find_by(id: )
  end

  private

  def comment_params
    params.require(:comment).permit(:commenter_id, :ride_id, :body)
  end
end
