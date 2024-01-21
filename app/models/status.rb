class Status < ApplicationRecord

  validates :title, :position, :user, presence: true

  belongs_to :user,
    class_name: :User

  has_many :contacts,
    foreign_key: :status_id,
    class_name: :Contact

end
