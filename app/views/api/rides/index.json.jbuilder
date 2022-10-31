json.array! @rides do |ride|
  json.set! ride.id do
    json.extract! ride, :id, :title, :description, :elevation, :moving_time, :distance, :athlete_id
  end
end