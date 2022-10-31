json.array! @users do |user|
  json.set! user.id do
    json.extract! user, :email
  end
end