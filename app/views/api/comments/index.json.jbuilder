@comments.each do |comment|
  json.set! comment.id do
    json.extract! comment, :commenter_id, :ride_id
    json.profilePicUrl comment.commenter.profile_pic.url
  end
end