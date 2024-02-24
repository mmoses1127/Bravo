class Contact < ApplicationRecord

  validates :name, presence: true

  belongs_to :user,
    class_name: :User

  has_many :interactions,
    foreign_key: :contact_id,
    class_name: :Interaction,
    dependent: :destroy

end
