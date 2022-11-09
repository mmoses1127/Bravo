import { useEffect, useState, useRef } from "react";
import {useLoadScript, GoogleMap, Marker, DirectionsRenderer, Circle, MarkerClusterer} from "@react-google-maps/api";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

export const RideMap = ({mapOptions}) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (!map) {
      setMap(new window.google.maps.Map(mapRef.current, {zoom: 9, center: {lat: 40.783254, lng: -73.974529}}
    ))
    }
  }, [mapRef, map]);

  const addPoint = (location, map) => {
    const point = new google.maps.Marker({
      position: location,
      map: map,
    });
    setPoints(point => [...points, point])
  };

  google.maps.event.addListener(map.current, "click", (event) => {
    setCoords(coord => [...coord, event.latLng])
    addPoint(event.latLng, map.current);
  }, []);



  return (
    <div className="google-map-container" ref={mapRef}>Map</div>
  )

};







const RideMapWrapper = () => {

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <RideMap />
    </Wrapper>
  )
};


export default RideMapWrapper;
