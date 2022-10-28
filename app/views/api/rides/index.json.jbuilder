json.array! @rides do |ride|
  ride.set! ride.id do
    json.id ride.id
    json.name ride.name
    json.created_at ride.created_at
  end
end