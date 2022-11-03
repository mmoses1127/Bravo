require 'open-uri'

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
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
  user1 = User.create!( 
    email: 'demo@user.io',
    name: 'Derek Demoman', 
    password: 'password'
  )
  user1.profile_pic.attach(io: pic_1, filename: 'profile_pic')

  # More users
  i = 0
  while i < 10
    user = User.create!({
      email: Faker::Internet.unique.email,
      name: Faker::Name.unique.name,
      password: 'password'
    }) 
    user.profile_pic.attach(io: profile_pics[i], filename: 'profile_pic')
    i += 1
  end


  # rides
  Ride.create!({
    date_time: "2022-02-02 017:02:36 UTC",
    title: "Big loop in Annadel Park",
    description: "Legs were a bit tired, so took it easy. Autumn colors starting to come out.",
    athlete_id: 1,
    distance: 25.4,
    duration: 6231,
    elevation: 587,
    # GPXFile: "./assets/gpx/annadel24334.gpx"
  });

  Ride.create!({
    date_time: "2022-03-13 015:12:36 UTC",
    title: "Recovery ride with Justin",
    description: "Easy spin after a tough race weekend.",
    athlete_id: 3,
    distance: 13.6,
    duration: 2956,
    elevation: 287,
    # GPXFile: "./assets/gpx/recovery42343.gpx"
  });

  Ride.create!({
    date_time: "2022-05-21 012:48:01 UTC",
    title: "To the peak of Jack London",
    description: "Big climb and epic descent.",
    athlete_id: 1,
    distance: 39.0,
    duration: 4000,
    elevation: 1201,
    # GPXFile: "./assets/gpx/jlondon42334.gpx"
  });

  puts "Done!"
end
