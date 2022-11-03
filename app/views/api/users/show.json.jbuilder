# @user.id do
  json.extract! @user, :id, :name, :email, :created_at, :updated_at
  json.profile_pic_url @user.profile_pic.url
# end


