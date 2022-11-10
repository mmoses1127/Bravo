import { useEffect, useState, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

export const RideMap = ({passUpDistance, passUpDuration}) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [coords, setCoords] = useState([]);
  const [distance, setDistance] = useState(0);
  const [polyline, setPolyline] = useState("");
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!map) {
      setMap(new window.google.maps.Map(mapRef.current, {zoom: 9, center: {lat: 40.783254, lng: -73.974529}}
    ))
    }
    
  }, [mapRef]);


  

  useEffect(() => {
    if (map) {

      const addMarker = (location, map) => {
        const marker = new window.google.maps.Marker({
          position: location,
          map: map,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 4.5,
            fillColor: "red",
            fillOpacity: 0.8,
            strokeWeight: 0
        }
        });
        setMarkers(marks => [...marks, marker])
      };

      window.google.maps.event.addListener(map, "click", (event) => {
        setCoords(allCoords => [...allCoords, event.latLng])
        addMarker(event.latLng, map);
      });
    };
    
  }, [map]) ;
  
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
            console.log(response)
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

              setDistance(totalDistance);
              setPolyline(poly);
              setDuration(totalDuration);
              directionsRenderer.setDirections(response);
          }
      }); 
      
      passUpDistance(distance);
      passUpDuration(duration);

  };

  useEffect(() => {

    if (coords.length > 1) {
        renderPath();
    }
  }, [coords])



  return (
    <div className="google-map-container" ref={mapRef}>Map</div>
  )

};






const RideMapWrapper = ({passUpDistance, passUpDuration}) => {

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <RideMap passUpDistance={passUpDistance} passUpDuration={passUpDuration}/>
    </Wrapper>
  )
};


export default RideMapWrapper;

