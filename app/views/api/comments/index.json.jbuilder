@comments.each do |comment|
  json.set! comment.id do
    json.extract! comment, :id, :commenter_id, :ride_id, :body, :created_at
    json.profilePicUrl comment.commenter.profile_pic.url
    json.commenter comment.commenter.name
  end
end