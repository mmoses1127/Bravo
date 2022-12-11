import { useEffect, useState, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import './Map.css'
import { render } from "react-dom";

export const RideMap = ({passUpMapData}) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [coords, setCoords] = useState([]);
  const [distance, setDistance] = useState(0);
  const [elevation, setElevation] = useState(0);
  const [polyline, setPolyline] = useState('');
  const [duration, setDuration] = useState(0);
  const [pathPoints, setPathPoints] = useState([]);
  const [elevationArray, setElevationArray] = useState([]);

  useEffect(() => {
    if (!map) {
      setMap(new window.google.maps.Map(mapRef.current, {streetViewControl: false, zoom: 12, center: {lat: 37.773972, lng: -122.431297}}))
    }
    
  }, [mapRef, map]);


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

  const elevator = new window.google.maps.ElevationService();
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
      
  };

  useEffect(() => {

    if (coords.length > 1) {
        renderPath();
    } 

  }, [coords, renderPath])

  useEffect(() => {
    calcElevationArray(pathPoints);
  }, [pathPoints, calcElevationArray])

  useEffect(() => {
    calcElevation(elevationArray);
  }, [elevationArray])

  useEffect(() => {
    passUpMapData(distance, duration, polyline, elevationArray, elevation);
  }, [distance, duration, polyline, elevationArray, elevation, passUpMapData])


  return (
    <div className="google-map-container" ref={mapRef}>Map</div>
  )

};






const RideMapWrapper = ({passUpMapData}) => {

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={["geometry"]}>
      <RideMap passUpMapData={passUpMapData}/>
    </Wrapper>
  )
};


export default RideMapWrapper;


