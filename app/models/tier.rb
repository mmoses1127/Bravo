class Tier < ApplicationRecord

  validates :name, :user_id, :position, presence: true

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  has_many :contacts,
    foreign_key: :tier_id,
    class_name: :Contact

end
