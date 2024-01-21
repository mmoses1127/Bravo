class CreateStatuses < ActiveRecord::Migration[7.0]
  def change
    create_table :statuses do |t|
      t.string :title, null: false, default: "Contact Status", null: false
      t.references :user, indexed: true, foreign_key: true
      t.integer :position, null: false
      t.timestamps
    end
  end
end
