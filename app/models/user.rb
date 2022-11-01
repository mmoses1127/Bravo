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
  has_secure_password

  before_validation :ensure_session_token
  
  validates :email, :session_token, presence: true, uniqueness: true
  validates :name, presence: true, length: { in: 3..255 }
  validates :email, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { in: 6..255 }, allow_nil: true

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
