  json.extract! @user, :id, :name, :email, :created_at, :updated_at
  json.profilePicUrl url_for(@user.profile_pic)



