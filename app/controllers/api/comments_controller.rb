class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    if @comment.save!
      @comments = Comment.all
      render :show
    else
      render json: {errors: @comment.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def index
    @comments = Comment.all
    if @comments
      render :index
    else
      render json: { errors: ['No comments to show'] }, status: :unprocessable_entity
    end
  end

  def update
    @comment = Comment.find_by(id: params[:id])
    if @comment.update(comment_params)
      render :show
    else
      render json: {errors: @comment.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find_by(id: params[:id])
    if @comment.destroy!
      render :show
    else
      render json: { errors: ['Comment not deleted.'] }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:commenter_id, :ride_id, :body, :id)
  end
end
