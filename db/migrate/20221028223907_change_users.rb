class ChangeUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :username
    add_column :users, :avatar_image, :string, :default => 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/323_Strava_logo-512.png'
  end
end
