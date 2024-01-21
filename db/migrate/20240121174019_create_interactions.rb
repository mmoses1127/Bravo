class CreateInteractions < ActiveRecord::Migration[7.0]
  def change
    create_table :interactions do |t|
      t.datetime :date_contacted, null: false
      t.string :contact_method
      t.datetime :next_contact_date
      t.string :notes
      t.references :contact, null: false, foreign_key: true, indexed: true
      t.references :user, null: false, foreign_key: true, indexed: true
      t.timestamps
    end
  end
end
