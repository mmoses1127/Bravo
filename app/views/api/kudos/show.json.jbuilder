json.extract! @kudo, :id, :giver_id, :ride_id
json.profilePicUrl @kudo.giver.profile_pic.url