json.array! @rides do |ride|
  json.set! ride.id do
    json.id ride.id
    json.title ride.title
    json.description ride.description
  end
end