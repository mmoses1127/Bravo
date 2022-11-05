import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import '../Map/Map.css';


mapboxgl.accessToken = 'pk.eyJ1IjoibW1vc2VzMTEyNyIsImEiOiJjbDl5cWtkdnAwN2pwM3BrbnZsNTZzZHIzIn0.5DYp57TWNGkULiO3KhdVbg';

const EditMap = () => {
  
  const map = new mapboxgl.Map({
    container: 'map', // Specify the container ID
    style: 'mapbox://styles/mapbox/streets-v11', // Specify which map style to use
    center: [-122.42136449,37.80176523], // Specify the starting position
    zoom: 14.5, // Specify the starting zoom
  });

};

export default EditMap;