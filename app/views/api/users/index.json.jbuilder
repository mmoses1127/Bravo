@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :name, :email
    if user.profile_pic
      json.profilePicUrl user.profile_pic.url
    else
      json.profilePicUrl "https://e7.pngegg.com/pngimages/928/623/png-clipart-strava-logo-cycling-zwift-mobile-app-cycling-angle-text.png"
    end
  end
end