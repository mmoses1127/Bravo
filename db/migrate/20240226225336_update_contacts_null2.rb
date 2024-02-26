class UpdateContactsNull2 < ActiveRecord::Migration[7.0]
  def change
    change_column_null :contacts, :company, false
  end
end
