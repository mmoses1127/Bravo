class UpdateRides2 < ActiveRecord::Migration[7.0]
  def change
    remove_column :rides, :gpx_file_url
    add_column :rides, :gps_points, :text, array: true, default: []
  end
end
