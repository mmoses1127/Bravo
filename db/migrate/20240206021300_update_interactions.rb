class UpdateInteractions < ActiveRecord::Migration[7.0]
  def change
    add_column :interactions, :interaction_number, :integer
  end
end
