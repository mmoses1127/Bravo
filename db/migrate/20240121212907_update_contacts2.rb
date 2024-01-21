class UpdateContacts2 < ActiveRecord::Migration[7.0]
  def change
    remove_column :contacts, :status_id
    add_column :contacts, :column_order, :int, null: false, default: 0
  end
end
