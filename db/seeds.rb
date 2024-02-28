require 'open-uri'

puts "Destroying tables..."
# Unnecessary if using `rails db:seed:replant`
Kudo.destroy_all
Comment.destroy_all
Ride.destroy_all
Interaction.destroy_all
Contact.destroy_all
Tier.destroy_all
User.destroy_all

puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ApplicationRecord.connection.reset_pk_sequence!('users')

puts "Creating users..."
# Create profile pics for seeding users
# pic_1 = URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/profile_1.jpg')

# profile_pics = [
#   URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210530_160249.jpg'), 
#   URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210727_190238(2).jpg'), 
#   URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210605_130446.jpg'), 
#   URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210701_190934.jpg'), 
#   URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/PXL_20220924_191312598.jpg'), 
#   URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210711_195635.jpg'), 
#   URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210727_190328.jpg'), 
#   URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210513_180408.jpg'), 
#   URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210716_175550.jpg'), 
#   URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210727_190714.jpg')
# ]


# Create one user with an easy to remember username, email, and password:
puts "Creating demo user..."
demo_user = User.create!( 
  email: 'demo@user.io',
  name: 'Derek Demoman', 
  password: 'password'
)
puts "Attaching photo for demo user..."
# demo_user.profile_pic.attach(io: pic_1, filename: 'profile_pic')

# More users
puts "Creating more users..."

i = 0
while i < 4
  user = User.create!({
    email: i.to_s + 'tester@demo.com',
    name: Faker::Name.unique.name,
    password: 'password'
  }) 
  # puts "Attaching photo..."
  # user.profile_pic.attach(io: profile_pics[i], filename: 'profile_pic')
  i += 1
puts "Completed a user"

end


# Create Tier for Demo User
puts "Creating default Tier for all users..."

for user in User.all
  Tier.create!({
    user_id: user.id,
    name: "New",
    position: 0,
  })
  Tier.create!({
    user_id: user.id,
    name: "Colleagues",
    position: 1,
  })
  Tier.create!({
    user_id: user.id,
    name: "Friends",
    position: 2,
  })
  Tier.create!({
    user_id: user.id,
    name: "Potential Referrals",
    position: 3,
  })
  Tier.create!({
    user_id: user.id,
    name: "References",
    position: 4,
  })
end


puts "Done!"

