json.set! @ride.id do
  json.extract! @ride, :id, :title, :description, :elevation, :ride_time, :distance, :athlete_id
end