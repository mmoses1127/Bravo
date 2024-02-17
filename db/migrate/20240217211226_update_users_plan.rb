class UpdateUsersPlan < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :plan, :string, null: false, default: 'free'
  end
end
