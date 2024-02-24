class UpdateContactsLinked < ActiveRecord::Migration[7.0]
  def change
    rename_column :contacts, :linkedIn, :linked_in
  end
end
