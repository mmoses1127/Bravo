class CreateKudos < ActiveRecord::Migration[7.0]
  def change
    create_table :kudos do |t|
      t.references :giver, null: false, foreign_key: {to_table: :users}
      t.references :ride, null: false, index: true, foreign_key: {to_table: :rides}
      t.timestamps
    end
    add_index :kudos, [:giver_id, :ride_id], unique: true
  end
end
