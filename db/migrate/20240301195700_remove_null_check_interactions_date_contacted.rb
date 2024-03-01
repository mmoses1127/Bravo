class RemoveNullCheckInteractionsDateContacted < ActiveRecord::Migration[7.0]
  def change
    change_column_null :interactions, :date_contacted, true
  end
end
