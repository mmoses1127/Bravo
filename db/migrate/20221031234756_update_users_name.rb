class UpdateUsersName < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :name, :string, null: false, index: true
  end
end
