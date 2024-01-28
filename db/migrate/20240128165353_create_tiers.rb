class CreateTiers < ActiveRecord::Migration[7.0]
  def change
    create_table :tiers do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.string :name, null: false, default: "New Tier"
      t.integer :position, null: false
      t.timestamps
    end
  end
end
