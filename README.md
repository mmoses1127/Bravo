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

### CreateRideMap.js
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

### CreateRideMap.js

```javascript

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

The file attachment input is handled by a file-input html element with the propery 'multiple'.

### CreateRideMap.js
```jsx

<input className='file-input' type='file' onChange={handleFile} multiple></input>

```

The map interface for creating rides is the feature of Bravo I am most proud of. First of all, to utilize Google Maps in React, I wrapped the map component in the Google Maps React Wrapper, which enables all the standard features. However, I needed a non-standard library, geometry, in order to fetch elevation data. Much searching and trial and error yielded the solution: it could be passed in as the value of a 'libraries' prop passed to the map wrapper.

### RideMap index.js

```javascript

import { Wrapper } from "@googlemaps/react-wrapper";

export const RideMap = ({passUpMapData}) => {

```
```javascript

const RideMapWrapper = ({passUpMapData}) => {

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={["geometry"]}>
      <RideMap passUpMapData={passUpMapData}/>
    </Wrapper>
  )
};


export default RideMapWrapper;

```

This elevation data was acquired using the Google Elevation Service API. An array of elevations for the path of the user's bike route was generated. Also, the net positive elevation was calculated to determine the climbing difficulty of the ride.

### RideMap index.js
```javascript

  const elevator = new window.google.maps.ElevationService();

  const calcElevationArray = async (points) => {
    if (points.length > 1) {
      let elev = await (elevator.getElevationAlongPath({
        path: points,
        samples: 40,
      }));
      await setElevationArray(elev[`results`].map(result => {
        return result[`elevation`];
      }));
    };
    
  };

  const calcElevation = (elevationArray) => {
    let totalClimbing = 0;
    for (let i = 0; i < elevationArray.length - 1; i++) {
      if (elevationArray[i] < elevationArray[i+1]) {
        totalClimbing += elevationArray[i+1] - elevationArray[i]
      };
    };
    setElevation(Math.round(totalClimbing * 10) / 10);
  };
  
```

The create ride component renders the map data, including distance, estimated duration, and elevation, to the form as the user clicks on the map and creates a route. However, the data was lagging behind 1 - 2 clicks. I soon realized that state setters were asynchronous and solved my problem by creating a chain of useEffects that listened to changes in data and triggered the functions which generate other dependent data.

### RideMap index.js
```javascript

  useEffect(() => {

    if (coords.length > 1) {
        renderPath();
    } 

  }, [coords])

  useEffect(() => {
    calcElevationArray(pathPoints);
  }, [pathPoints])

  useEffect(() => {
    calcElevation(elevationArray);
  }, [elevationArray])
  
```

All this data needed to be passed up from the map component to the component which contained the form for creating rides. This was facilitated by passing a function down as a prop to the map wrapper. This function passed up all the relevant map data and was itself triggered by a useEffect that listened for changes in any of the data to be passed. This function, in turn, needed to be passed further down from the map wrapper to the map itself. What a journey!

### CreateRideMap.js

```javascript

  const passUpMapData = (distance = 0, duration = 0, polyline = {}, elevationArray = [], elevation = 0) => {
    setDistance(distance);
    setDuration(duration);
    setPolyline(polyline);
    setPathPoints(pathPoints);
    setElevationArray(elevationArray);
    setElevation(elevation * 10 / 10)
  };
  
  ...
  
  <RideMapWrapper passUpMapData={passUpMapData} />
  
```
### RideMap index.js

```javascript
  

  useEffect(() => {
    passUpMapData(distance, duration, polyline, elevationArray, elevation);
  }, [distance, duration, polyline, elevationArray, elevation]);
  
  ...
  
  const RideMapWrapper = ({passUpMapData}) => {

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={["geometry"]}>
      <RideMap passUpMapData={passUpMapData}/>
    </Wrapper>
  )
};
  
  

```

I learned to be comfortable with the infamous useRef through this project. Keeping track of the most current state of elements and variables is essential with the several re-renders going on on each page. This was especially important when giving the map a reference to an HTML element to live inside.

### RideMap index.js
```javascript

  import { useEffect, useState, useRef } from "react";

  export const RideMap = ({passUpMapData}) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  
  ...
  
    useEffect(() => {
    if (!map) {
      setMap(new window.google.maps.Map(mapRef.current, {streetViewControl: false, zoom: 12, center: {lat: 37.773972, lng: -122.431297}}))
    }
    
  }, [mapRef]);
  
  ...

  return (
    <div className="google-map-container" ref={mapRef}>Map</div>
  )

```


Rendering paths between points as the user creates a route is a key function of this app. I utilized calls to the Google Directions Service and Directions Renderer APIs. I pushed in previously clicked points as 'midpoints' so that the route would be forced to travel through all diresed points on the map.

### RideMap index.js
```javascript

const directionsRenderer = new window.google.maps.DirectionsRenderer({suppressMarkers: true});
directionsRenderer.setMap(map);
const directionsService = new window.google.maps.DirectionsService();

const renderPath = () => {

  let midpoints = []
  for(let i = 1; i < coords.length - 1; i++) {
    let point = coords[i];
    let wayPoint = {};
      wayPoint['location'] = new window.google.maps.LatLng(point);
      midpoints.push(wayPoint);
      wayPoint = {}
  }

  const request = {
      origin: coords[0],
      destination: coords[coords.length - 1],
      travelMode: 'BICYCLING',
      unitSystem: window.google.maps.UnitSystem.METRIC,
      waypoints: midpoints
  }
      
directionsService.route(request, (response, status) => {
  if (status === 'OK') {
      const poly = response.routes[0].overview_polyline

      const distanceArray = response.routes[0].legs;
      let totalDistance = 0;
      distanceArray.forEach(dis => {
          let value = dis.distance.value / 1000;
          totalDistance += value;
      })

      const durationArray = response.routes[0].legs;
      let totalDuration = 0;
      durationArray.forEach(dur => {
          let value = dur.duration.value;
          totalDuration += value;


        })

      const pathPointSet = response.routes[0].overview_path;

      setDistance(Math.round(totalDistance * 10) / 10);
      setPolyline(poly);
      setDuration(Math.round(totalDuration / 60 * 10) / 10);
      setPathPoints(pathPointSet);

      directionsRenderer.setDirections(response);
  }
}); 

```
      
## Ride Show

All this data, but what to do with it? Render it handsomely, of course! The ride show page displays (if input by the user) a beautiful and interactive map with a polyline representing the route, an elevation profile area chart allowing inspection of points anywhere along the route, relevant ride data such as duration and distance, and a selection of user-uploaded photos that can be clicked to access a dynamic modal.

Here is the code for the elevation chart, powered by Recharts.js.

### RideShow index.js
```javascript

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

<div className="ride-show-elevation">
    <ResponsiveContainer width="100%" >
      <AreaChart data={elevationData} margin={{top: 10, right: 30}}>
          <CartesianGrid />
          <XAxis tick={false}/>
          <YAxis padding={{ top: 50 }}/>
          <Tooltip />
          <Area type="monotone" dataKey="elevation" fill="gray" stroke="gray"
              activeDot={{ r: 8 }} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
      
```

The custom modal allows infinite rolodexing through a modulo that wraps the current photo index.

### RideShow index.js

```javascript

  const showPhotoModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setOpenModal(false)
  }
  
  ...
  
  return (
    <div className="page-container-show">
      {openModal && < PhotoModal ride={ride} closeModal={closeModal}/>}
      <div className="ride-show-header">
      
  ...
  
  <div className="show-main-img">
    {ride.photoUrls?.slice(0, 5).map((photoUrl, i) => (
      <div key={i} className='small-square-thumb-box'>
        <img onClick={showPhotoModal} className='photo-thumb' alt='Ride' src={photoUrl}/>
      </div>
    ))}
  </div>
  
  ```
  
  
