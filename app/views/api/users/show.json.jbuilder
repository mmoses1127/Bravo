json.extract! @user, :id, :name, :email, :created_at, :updated_at
json.profilePicUrl @user.profile_pic.url
