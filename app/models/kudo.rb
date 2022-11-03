class Kudo < ApplicationRecord

  validates: :giver_id, :user_id, presence: true

  belongs_to :giver,
    class_name: :User

  belongs_to :ride,
    class_name: :Ride

end
