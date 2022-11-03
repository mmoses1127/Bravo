@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :name, :email
    json.profilePicUrl url_for(@user.profile_pic)
  end
end