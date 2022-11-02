import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import './Map.css';
// import 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.css';
// import 'https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibW1vc2VzMTEyNyIsImEiOiJjbDl5cWtkdnAwN2pwM3BrbnZsNTZzZHIzIn0.5DYp57TWNGkULiO3KhdVbg';

const Map = () => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const draw = new MapboxDraw();
  console.log(draw)
  
  
  
  console.log(map)
  
  

  
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    });

    map.current.addControl(draw, 'top-left');

  });
  

  return (
    <div className="outer-map-container">
    <div ref={mapContainer} className="map-container" />
    </div>
    );

};

export default Map;