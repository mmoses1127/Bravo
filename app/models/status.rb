class Status < ApplicationRecord

  validates :title, :position, :user_id, presence: true

  belongs_to :user,
    class_name: :User

end
