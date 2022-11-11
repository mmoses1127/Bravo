json.extract! @user, :id, :name, :email, :created_at, :updated_at
if @user.profile_pic
  json.profilePicUrl @user.profile_pic.url
else
  json.profilePicUrl 'https://e7.pngegg.com/pngimages/928/623/png-clipart-strava-logo-cycling-zwift-mobile-app-cycling-angle-text.png'
end