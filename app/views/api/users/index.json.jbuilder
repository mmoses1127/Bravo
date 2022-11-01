@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :name, :email
  end
end