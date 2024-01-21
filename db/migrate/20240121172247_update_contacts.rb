class UpdateContacts < ActiveRecord::Migration[7.0]
  def change
    add_column :contacts, :status_id, :bigint, null: false, foreign_key: true
    add_index :contacts, :status_id
  end
end
