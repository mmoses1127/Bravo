json.extract! @ride, :id, :title, :description, :elevation, :duration, :distance, :date_time, :athlete_id
json.username @ride.athlete.name