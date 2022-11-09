import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createRide } from '../../store/rides';
import { getCurrentUser } from '../../store/session';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import './RideForm.css';
import * as turf from '@turf/turf';

// MAP SECTION

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const CreateRideMap = () => {
  
  const dispatch = useDispatch();
  const [routeCoords, setRouteCoords] = useState([]);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-71.057198);
  const [lat, setLat] = useState(42.360446);
  const [zoom, setZoom] = useState(12);
  const [elevation, setElevation] = useState([])



  const draw = new MapboxDraw({
    // Instead of showing all the draw tools, show only the line string and delete tools.
    displayControlsDefault: false,
    controls: {
      line_string: true,
      trash: true
    },
    // Set the draw mode to draw LineStrings by default.
    defaultMode: 'draw_line_string',
    styles: [
      // Set the line style for the user-input coordinates.
      {
        id: 'gl-draw-line',
        type: 'line',
        filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#438EE4',
          'line-dasharray': [0.2, 2],
          'line-width': 4,
          'line-opacity': 0.3
        }
      },
      // Style the vertex point halos.
      {
        id: 'gl-draw-polygon-and-line-vertex-halo-active',
        type: 'circle',
        filter: [
          'all',
          ['==', 'meta', 'vertex'],
          ['==', '$type', 'Point'],
          ['!=', 'mode', 'static']
        ],
        paint: {
          'circle-radius': 1,
          'circle-color': '#FFF'
        }
      },
      // Style the vertex points.
      {
        id: 'gl-draw-polygon-and-line-vertex-active',
        type: 'circle',
        filter: [
          'all',
          ['==', 'meta', 'vertex'],
          ['==', '$type', 'Point'],
          ['!=', 'mode', 'static']
        ],
        paint: {
          'circle-radius': 8,
          'circle-color': '#438EE4'
        }
      }
    ]
  });

  // const iterateElevation = (points) => {
  //   console.log(points)
  //   const elev = points.map(point => {
  //     return map.current.queryTerrainElevation({lng: point[0], lat: point[1]})
  //   });
  //   return elev;
  // }

  // Use the coordinates you drew to make the Map Matching API request
  function updateRoute() {
    // Set the profile
    const profile = 'driving';
    // Get the coordinates that were drawn on the map
    const data = draw.getAll();
    const lastFeature = data.features.length - 1;
    const coords = data.features[lastFeature].geometry.coordinates;
    // Format the coordinates
    const newCoords = coords.join(';');
    // Set the radius for each coordinate pair to 50 meters
    const radius = coords.map(() => 50);
    getMatch(newCoords, radius, profile);
  }

  // Make a Map Matching request
  async function getMatch(coordinates, radius, profile) {
  // Separate the radiuses with semicolons
    const radiuses = radius.join(';');
  // Create the query
    const query = await fetch(
      `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    const response = await query.json();
  // Handle errors
    if (response.code !== 'Ok') {
      alert(
        `The mapping program has thrown the following error: ${response.code} - ${response.message}.\n\nFor more information: https://docs.mapbox.com/api/navigation/map-matching/#map-matching-api-errors`
      );
      return;
    }
  // Get the coordinates from the response
    const coords = response.matchings[0].geometry;
  // Save coordinates to state variable and add route
    setRouteCoords(coords['coordinates']);
    // setElevation(iterateElevation(coords['coordinates']))
    addRoute(coords);
    // console.log(elevation)
    // Get total distance of route
    const calcDistance = (coords) => {
      console.log(coords)
      let totalDistance = 0;
      for (let i = 0; i < coords.length - 1; i++) {
        totalDistance += turf.distance(coords[i], coords[i+1], {units: 'kilometers'});
      }
      return totalDistance;
    };

    setDistance(Math.round((calcDistance(coords['coordinates'])) * 10) / 10)
  };

  let linestring;

  // Draw the Map Matching route as a new layer on the map
  function addRoute(coords) {
    // If a route is already loaded, remove it
    if (map.current.getSource('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    } else {
      // Add a new layer to the map
      linestring = map.current.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: coords
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': 'red',
          'line-width': 6,
          'line-opacity': 0.7
        }
      });
    }
  };

  function removeRoute() {
    if (!map.current.getSource('route')) return;
    map.current.removeLayer('route');
    map.current.removeSource('route');
  };
  
  
  useEffect(() => {
    if (map.current) return; // initialize map only once

    const loadMap = async () => {
      map.current = await new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
      });

      setTimeout(() => {
        map.current.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.terrain-rgb',
          'tileSize': 512,
          'maxzoom': 14
          });
        map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });  
        map.current.addControl(draw, 'top-left');
        map.current.on('draw.create', updateRoute);
        map.current.on('draw.update', updateRoute);
        map.current.on('draw.delete', removeRoute);
      }, 2000)

    }

    loadMap();

  }, [map.current]);

  // let elevation2;
  // const coordinate = [-122.420679, 37.772537];
  // if (map.current) {
  //   elevation2 = map.current.queryTerrainElevation(coordinate);

  // }

  // const fetchElev = async () => {
  //   let elev = await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536%2C-104.9847034&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`, {
  //     headers: { 'Access-Control-Allow-Origin': '*' }
  //   });

  //   let elev_string = JSON.stringify(elev.data);
  //   console.log(elev_string)
  // }

  // fetchElev();

  // var axios = require('axios');

  // var config = {
  //   method: 'get',
  //   url: `https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536%2C-104.9847034&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  //   headers: { 'Access-Control-Allow-Origin': '*' }
  // };

  // axios(config)
  // .then(function (response) {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  

  // RIDE FORM SECTION

  const history = useHistory();
  const currentUser = useSelector(getCurrentUser);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);

  const handleClick = async (e) => {
    await handleSubmit(e);
    history.push(`/`);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newRide = new FormData();
    newRide.append('ride[title]', title);
    newRide.append('ride[distance]', distance);
    newRide.append('ride[description]', description);
    newRide.append('ride[duration]', duration);
    newRide.append('ride[elevation]', elevation);
    newRide.append('ride[date_time]', `${date} 0${time}:00 UTC`);
    newRide.append('ride[athleteId]', currentUser.id);
    newRide.append('ride[gps_points]', routeCoords);
    if (photoFiles) {
      photoFiles.forEach(photoFile => {
        newRide.append('ride[photos][]', photoFile);
      });
    };

    return dispatch(createRide(newRide))
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
  };

  const handleFile = (e) => {
    const files = Object.values(e.currentTarget.files);
    setPhotoFiles(files);
  };



  // RETURN SECTION
  
  return (
    <div className='page-container-map-entry'>
      <form className="rideform-form-map" onSubmit={handleClick}>
        <h1 className='title-header'>Create Ride - Map Entry</h1>
        <div className='stat-entry-top'>
          <div className='distance-and-elev'>
          <fieldset>
              <legend>Distance (km)</legend>
              <div className='inline-inputs'>
                <label>
                  <input disabled type='number' value={distance} />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Elevation</legend>
              <div className='inline-inputs'>
                <label>
                  <input disabled type='number' onChange={e => setElevation(e.target.value)} value={elevation} />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Date</legend>
              <div className='inline-inputs'>
                <label>
                  <input type='date' onChange={e => setDate(e.target.value)} value={date} />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Time</legend>
              <div className='inline-inputs'>
                <label>
                  <input type='time' onChange={e => setTime(e.target.value)} value={time} />
                </label>
              </div>
            </fieldset>            

            <fieldset>
              <legend>Duration</legend>
              <div className='inline-inputs'>
                <label>
                  <input type='number' onChange={e => setDuration(e.target.value)} value={duration} />
                </label>
              </div>
            </fieldset>

          </div>
        </div>
        <div className='stat-entry-bottom'>

          <fieldset>
            <legend>Title</legend>
            <div className='inline-inputs'>
              <label>
                <input type='text' onChange={e => setTitle(e.target.value)} value={title} />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Description</legend>
            <div className='inline-inputs'>
              <label>
                <textarea className='map-textarea' rows='1' cols='60' onChange={e => setDescription(e.target.value)} value={description} />
              </label>
            </div>
          </fieldset>

        </div>

        <div className='ride-entry-fields'>
          <fieldset>
            <legend>Photos</legend>
            <div className='photo-upload-zone'>
              <label>
                <input className='file-input' type='file' onChange={handleFile} multiple></input>
              </label>
            </div>
          </fieldset>
        </div>

        <div className='form-submit-area'>
          <button>Create</button>
          <Link to={`/dashboard`}>Cancel</Link>
        </div>

      </form>



      <div className="outer-map-container">
        <div ref={mapContainer} className="map-container" />
        {/* <button className="set-route-button">Set Route</button> */}
      </div>
    </div>



    );

};

export default CreateRideMap;