# Bravo

## Background

Bravo is a full stack clone of the popular social network for athletes called Strava. It was built with a Ruby on Rails backend, a PostgreSQL database, and a JavaScript React/Redux frontend. Bravo features extensive calls to various Google Maps APIs to allow real-time rendering of user-created bike routes. It also has CRUD functionality for rides and comments and partial CRUD for users and kudos (likes).

# Technologies

* The frontend is coded in JavaScript
* React and Redux were used to render components and manage state
* Ruby was used to code the routes, models, and controllers
* A rails framework tied this code to a PostgreSQL database
* Management of geographic data was enabled through calls to Google Maps, Elevation, and Directions APIs
* Static map imagery provided by the Google Static Maps API

# Selected Features and Development

## Create Ride

Ride creation is powered by an intermediary click handler which takes care of data validation on the front end, utilizes a loading spinner, disables the button while loading, saves the return value of the dispatched ride to a variable, then uses that variable to access the new ride's ID and redirect to the ride show page.

### createRideMap.js
```javascript

const handleClick = async (e) => {
    e.preventDefault();
    if (distance <= 0 || duration <= 0 || elevation <= 0) {
      alert('Your ride must have distance, duration, and elevation greater than 0.')
    } else {
      setLoading(true);
      rideSubmitButton.setAttribute(`id`, `clicked-button`);
      rideSubmitButton.disabled = true;
      let ride = await handleSubmit(e);
      history.push(`/rides/${ride.id}`);
    }
  };
  
```

The fun doesn't end there. The next function in the chain utilizes FormData to allow for the attaching of multiple photos via AWS and Rails Active Storage blobs. Error handling is performed again via a .catch, which sends backend error messages to the front to be rendered.

```
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const dateTime = new Date(`${date} 0${time}:00`);
    const UTCTime = dateTime.toUTCString();

    const newRide = new FormData();
    newRide.append('ride[title]', title);
    newRide.append('ride[distance]', distance);
    newRide.append('ride[description]', description);
    newRide.append('ride[duration]', duration);
    newRide.append('ride[gps_points]', elevationArray);
    newRide.append('ride[polyline]', polyline);
    newRide.append('ride[elevation]', elevation);
    newRide.append('ride[date_time]', UTCTime);
    newRide.append('ride[athleteId]', currentUser.id);
    if (photoFiles) {
      photoFiles.forEach(photoFile => {
        newRide.append('ride[photos][]', photoFile);
      });
    };

    returnedRide = dispatch(createRide(newRide))
    .catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });

    return returnedRide
  };

  const handleFile = (e) => {
    const files = Object.values(e.currentTarget.files);
    setPhotoFiles(files);
  };

```

The file attachment input is handled by a file-input html element with the propery 'multiple'

```jsx

<input className='file-input' type='file' onChange={handleFile} multiple></input>

```
## 
