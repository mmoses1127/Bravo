class Comment < ApplicationRecord

  validates :ride_id, :commenter_id, :body, presence: true

  belongs_to :ride,
    class_name: :Ride

  belongs_to :commenter,
    class_name: :User

end
