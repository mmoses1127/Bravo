# == Schema Information
#
# Table name: rides
#
#  id           :bigint           not null, primary key
#  date_time    :datetime         not null
#  title        :string           not null
#  description  :string
#  athlete_id   :bigint
#  distance     :float            not null
#  elevation    :float
#  gpx_file_url :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  duration     :integer          not null
#
class Ride < ApplicationRecord

  validates :date_time, :title, :athlete_id, :distance, :duration, presence: true
  
  belongs_to :athlete,
    class_name: :User

  has_many :kudos,
    foreign_key: :ride_id
    class_name: :Kudo

  # has_many :comments,
  #   foreign_key: :ride_id,
  #   class_name: :Comment


end
