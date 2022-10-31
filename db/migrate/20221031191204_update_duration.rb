class UpdateDuration < ActiveRecord::Migration[7.0]
  def change
    remove_column :rides, :duration
    add_column :rides, :duration, :integer, null: false
  end
end
