class AddMapUrlPolyine < ActiveRecord::Migration[7.0]
  def change
    add_column :rides, :polyline, :string
  end
end
