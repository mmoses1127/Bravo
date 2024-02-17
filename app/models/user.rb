# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  avatar_image    :string           default("https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/323_Strava_logo-512.png")
#  name            :string           not null
#

class User < ApplicationRecord
  require 'open-uri'

  has_secure_password

  before_validation :ensure_session_token
  
  validates :email, :session_token, presence: true, uniqueness: true
  validates :name, presence: true, length: { in: 3..255 }
  validates :email, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { in: 8..255 }, allow_nil: true

  has_many :rides,
    foreign_key: :athlete_id,
    class_name: :Ride,
    dependent: :destroy

  has_many :comments,
  foreign_key: :commenter_id,
  class_name: :Comment,
  dependent: :destroy

  has_many :kudos,
  foreign_key: :giver_id,
  class_name: :Kudo,
  dependent: :destroy

  has_many :contacts,
  foreign_key: :user_id,
  class_name: :Contact,
  dependent: :destroy

  has_many :tiers,
  foreign_key: :user_id,
  class_name: :Tier,
  dependent: :destroy

  has_one_attached :profile_pic


  def self.find_by_credentials(email, password)
    user = nil
    user = User.find_by(email: email)

    if user && user.authenticate(password)
      return user
    else
      return nil 
    end
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private
  def generate_unique_session_token
    while true
      token = SecureRandom::urlsafe_base64(16)
      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end


