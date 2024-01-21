class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.datetime :date_connected
      t.string :company, null: false
      t.string :title
      t.string :connection_description
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, null: false
      t.string :phone_number
      t.references :user, indexed: true, foreign_key: true
      t.timestamps
    end
  end
end
