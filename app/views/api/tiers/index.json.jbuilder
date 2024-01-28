@tiers.each do |tier|
  json.set! tier.id do
    json.extract! tier, :id, :name, :position, :user_id
  end
end