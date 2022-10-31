class UpdateRides < ActiveRecord::Migration[7.0]
  def change
    rename_column :rides, :moving_time, :duration
  end
end
