json.array! @rides do |ride|
  json.set! ride.id do
    json.extract! ride, :id, :title, :description, :elevation, :duration, :distance, :athlete_id
    json.email ride.athlete.email
  end
end