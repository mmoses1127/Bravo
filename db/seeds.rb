ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!( 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  10.times do 
    User.create!({
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
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
