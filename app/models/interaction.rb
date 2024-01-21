class Interaction < ApplicationRecord

  validates :contact_id, :user_id, :date_contacted, presence: true

  belongs_to :contact,
    class_name: :Contact

  belongs_to :user,
    class_name: :User

end
