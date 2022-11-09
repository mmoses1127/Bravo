import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useDispatch } from "react-redux";


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const Map = () => {
  
  const dispatch = useDispatch();
  const [routeCoords, setRouteCoords] = useState(3);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-71.057198);
  const [lat, setLat] = useState(42.360446);
  const [zoom, setZoom] = useState(13);

  // const setRoute = (e) => {
  //   e.preventDefault();
  //   setRouteCoords(coords);
  //   console.log(routeCoords)
  // };

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
    addRoute(coords);
  }

  // debugger

  // Draw the Map Matching route as a new layer on the map
  function addRoute(coords) {
    // If a route is already loaded, remove it
    if (map.current.getSource('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    } else {
      // Add a new layer to the map
      map.current.addLayer({
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
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
    
    map.current.addControl(draw, 'top-left');
    map.current.on('draw.create', updateRoute);
    map.current.on('draw.update', updateRoute);
    map.current.on('draw.delete', removeRoute);
  }, [map.current]);
  
  return (
    <div className="outer-map-container">
      
      <div ref={mapContainer} className="map-container" />
      {/* <button className="set-route-button">Set Route</button> */}
    </div>
    );

};

export default Map; 