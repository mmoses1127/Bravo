import { useEffect, useState, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

export const RideMap = ({mapOptions}) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [coords, setCoords] = useState([]);
  const [dis, setDistance] = useState(0);
  const [polyline, setPolyline] = useState("");
  const directionsRenderer = useRef(null);

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
        });
        setMarkers(marks => [...marks, marker])
      };

      window.google.maps.event.addListener(map, "click", (event) => {
        console.log(event.latLng)
        setCoords(allCoords => [...allCoords, event.latLng])
        addMarker(event.latLng, map);
      });
    };
    
  }, [map]) ;
  
  directionsRenderer.current = new window.google.maps.DirectionsRenderer();
  if (map) directionsRenderer.current.setMap(map.current);
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
          travelMode: 'WALKING',
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
          waypoints: midpoints
      }
      
      directionsService.route(request, (response, status) => {
          if (status === 'OK') {
              console.log(response)
              // const distanceArray = response.routes[0].legs;
              // const poly = response.routes[0].overview_polyline
              // let totalDistance = 0;
              // distanceArray.forEach(dis => {
              //     let stringNum = dis.distance.text.split(" ")[0];
              //     totalDistance += parseFloat(stringNum);
              // })

              // setDistance(totalDistance);
              // setPolyline(poly);
              directionsRenderer.current.setDirections(response);
          }
      }); 
      // directionsRenderer.current.setMap(map.current);
      

  }
  useEffect(() => {

    if (coords.length > 1) {
        renderPath();
    }
  }, [coords])

  console.log(coords[0])

  // console.log('google literal', new window.google.maps.LatLng(40, 40))

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


