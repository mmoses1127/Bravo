@kudos.each do |kudo|
  json.set! kudo.id do
    json.extract! kudo, :giver_id, :ride_id
  end
end