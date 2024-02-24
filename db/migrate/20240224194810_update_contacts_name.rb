class UpdateContactsName < ActiveRecord::Migration[7.0]
  def change
    remove_column :contacts, :first_name
    remove_column :contacts, :last_name
    add_column :contacts, :name, :string
    add_column :contacts, :linkedIn, :string
  end
end
