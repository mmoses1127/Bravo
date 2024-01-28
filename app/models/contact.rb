class Contact < ApplicationRecord

  validates :first_name, :last_name, :company, presence: true

  belongs_to :user,
    class_name: :User

  has_many :interactions,
    foreign_key: :contact_id,
    class_name: :Interaction,
    dependent: :destroy

  belongs_to :tier,
    class_name: :Tier

end
