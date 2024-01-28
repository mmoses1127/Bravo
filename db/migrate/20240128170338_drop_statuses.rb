class DropStatuses < ActiveRecord::Migration[7.0]
  def change
    drop_table :statuses
  end
end
