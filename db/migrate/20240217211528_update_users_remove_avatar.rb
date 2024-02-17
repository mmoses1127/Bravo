class UpdateUsersRemoveAvatar < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :avatar_image
  end
end
