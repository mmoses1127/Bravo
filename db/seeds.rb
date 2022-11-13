require 'open-uri'

puts "Destroying tables..."
# Unnecessary if using `rails db:seed:replant`
Kudo.destroy_all
Comment.destroy_all
Ride.destroy_all
User.destroy_all

puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ApplicationRecord.connection.reset_pk_sequence!('users')

puts "Creating users..."
# Create profile pics for seeding users
pic_1 = URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/profile_1.jpg')

profile_pics = [
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210530_160249.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210727_190238(2).jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210605_130446.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210701_190934.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/PXL_20220924_191312598.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210711_195635.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210727_190328.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210513_180408.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210716_175550.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210727_190714.jpg')
]


# Create one user with an easy to remember username, email, and password:
puts "Creating demo user..."
demo_user = User.create!( 
  email: 'demo@user.io',
  name: 'Derek Demoman', 
  password: 'password'
)
puts "Attaching photo for demo user..."
demo_user.profile_pic.attach(io: pic_1, filename: 'profile_pic')

# More users
puts "Creating more users..."

i = 0
while i < 4
  user = User.create!({
    email: i.to_s + 'tester@demo.com',
    name: Faker::Name.unique.name,
    password: 'password'
  }) 
  puts "Attaching photo..."
  user.profile_pic.attach(io: profile_pics[i], filename: 'profile_pic')
  i += 1
puts "Completed a user"

end

# # rides
# puts "Creating rides..."

# ride_1 = Ride.create!({
#   date_time: "2022-02-02 017:02:36 UTC",
#   title: "Big loop in Annadel Park",
#   description: "Legs were a bit tired, so took it easy. Autumn colors starting to come out.",
#   athlete_id: User.all[1].id,
#   distance: 25.4,
#   duration: 6231,
#   elevation: 587,
#   # GPXFile: "./assets/gpx/annadel24334.gpx"
# })
# ride_1.photos.attach([
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210525_190321.jpg'), filename: 'ride_pic'},
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/1623156396310.jpg'), filename: 'ride_pic'},
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/1627389574997-29.jpg'), filename: 'ride_pic'}
# ])

# ride_2 = Ride.create!({
#   date_time: "2022-03-13 015:12:36 UTC",
#   title: "Recovery ride with Justin",
#   description: "Easy spin after a tough race weekend.",
#   athlete_id: User.all[2].id,
#   distance: 13.6,
#   duration: 2956,
#   elevation: 287,
#   # GPXFile: "./assets/gpx/recovery42343.gpx"
# })
# ride_2.photos.attach([
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210716_175550.jpg'), filename: 'ride_pic'},
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210717_201312.jpg'), filename: 'ride_pic'}
# ])

# ride_3 = Ride.create!({
#   date_time: "2022-05-21 012:48:01 UTC",
#   title: "To the peak of Jack London",
#   description: "Big climb and epic descent.",
#   athlete_id: User.all[0].id,
#   distance: 39.0,
#   duration: 4000,
#   elevation: 1201,
#   # GPXFile: "./assets/gpx/jlondon42334.gpx"
# })

# ride_4 = Ride.create!({
#   date_time: "2022-11-5 012:19:01 UTC",
#   title: "Cruising through the hills",
#   description: "Toughest ride I've done in a while. I didn't bring enough food, so i Bonked super hard. I'll prepare better next time.",
#   athlete_id: User.all[4].id,
#   distance: 99.6,
#   duration: 3500,
#   elevation: 1946,
#   # GPXFile: "./assets/gpx/jlondon42334.gpx"
# })
# ride_4.photos.attach([
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/PXL_20220924_191312598.jpg'), filename: 'ride_pic'},
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/PXL_20220924_184256270.jpg'), filename: 'ride_pic'}
# ])

# # Create kudos
# puts "Creating kudos..."

# Kudo.create!({
#   giver_id: User.all[3].id,
#   ride_id: ride_2.id
# })

# Kudo.create!({
#   giver_id: demo_user.id,
#   ride_id: ride_1.id
# })

# Kudo.create!({
#   giver_id: User.all[2].id,
#   ride_id: ride_3.id
# })

# Kudo.create!({
#   giver_id: User.all[2].id,
#   ride_id: ride_2.id
# })

# # Create comments
# puts "creating comments..."

# Comment.create!({
#   commenter_id: User.all[6].id,
#   ride_id: 2,
#   body: 'How often do you shave your legs?'
# })

# Comment.create!({
#   commenter_id: User.all[2].id,
#   ride_id: 2,
#   body: 'How often do you shave your legs?'
# })

# Comment.create!({
#   commenter_id: User.all[5].id,
#   ride_id: 2,
#   body: 'Can you bring me next time?'
# })
# Comment.create!({
#   commenter_id: User.all[7].id,
#   ride_id: 2,
#   body: 'Did you steal my bike? It looks just like mine that got taken last week!'
# })
# Comment.create!({
#   commenter_id: User.all[2].id,
#   ride_id: 1,
#   body: 'Please call me before you go on this ride again! Awesome!'
# })
# Comment.create!({
#   commenter_id: User.all[3].id,
#   ride_id: 1,
#   body: 'You taking PEDs? So fast!'
# })


puts "Done!"

