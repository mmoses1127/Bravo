import { useEffect, useState, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export const RideShowMap = ({ride}) => {

  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  let coords;

  if (ride?.polyline) {
    const encodedStr = ride.polyline;

    coords = window.google.maps.geometry.encoding.decodePath(encodedStr);
    
    const route = new window.google.maps.Polyline({
      path: coords,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    
  
    route.setMap(map);
  
  }; 
  
  useEffect(() => {
    if (!map && coords) {
      setMap(new window.google.maps.Map(mapRef.current, {streetViewControl: false, zoom: 10, center: coords[0]}
        ))
    }
    
  }, [mapRef, coords, map]);
  
  
  

  return (
    <div className="google-map-container" ref={mapRef}>Map</div>
  )
  
};

const RideShowMapWrapper = ({ride}) => {

return (
  <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={["geometry"]} >
    <RideShowMap ride={ride}/>
  </Wrapper>
)
};


export default RideShowMapWrapper;