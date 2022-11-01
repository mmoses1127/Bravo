json.array! @rides do |ride|
  json.set! ride.id do
    json.extract! ride, :id, :title, :description, :elevation, :duration, :distance, :athlete_id
    json.username ride.athlete.name
  end
end