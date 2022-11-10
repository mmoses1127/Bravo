import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useDispatch } from "react-redux";
import './Map.css'


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const Map = ({coords}) => {
  
  const dispatch = useDispatch();
  const [routeCoords, setRouteCoords] = useState([]);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-71.057198);
  const [lat, setLat] = useState(42.360446);
  const [zoom, setZoom] = useState(12);
  const [elevation, setElevation] = useState([])


  // Draw the Map Matching route as a new layer on the map
  function addRoute(coords) {

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

      
    })
    
    setTimeout(() => {
      removeRoute();
      addRoute(coords);
    }, 2000)

    
  }, [map.current]);
  
  // if (map.current) {
  //   removeRoute();
  //   addRoute(coords);
  // }
  
  return (
      <div className="outer-map-container-show">
        <div ref={mapContainer} className="map-container" />
        {/* <button className="set-route-button">Set Route</button> */}
      </div>
    );

};

export default Map;