class CreateRides < ActiveRecord::Migration[7.0]
  def change
    create_table :rides do |t|
      t.datetime :date_time, null: false
      t.string :title, null: false, indexed: true
      t.string :description
      t.references :athlete, indexed: true, foreign_key: {to_table: :users}
      t.float :distance, null: false
      t.time :moving_time, null: false
      t.float :elevation
      t.string :gpx_file_url
      t.timestamps
    end
  end
end
