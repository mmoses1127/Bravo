@rides.each do |ride|
  json.set! ride.id do
    json.extract! ride, :id, :date_time, :title, :description, :elevation, :duration, :distance, :athlete_id, :polyline
    json.username ride.athlete.name
    json.profilePicUrl url_for(ride.athlete.profile_pic)
    json.photoUrls ride.photos.map { |photo| photo.url }
  end
end