json.extract! @ride, :id, :title, :description, :elevation, :duration, :distance, :date_time, :athlete_id, :gps_points, :polyline
json.username @ride.athlete.name
json.photoUrls @ride.photos.map { |photo| photo.url }
json.profilePicUrl url_for(@ride.athlete.profile_pic)