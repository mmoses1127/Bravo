// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import MapboxDraw from "@mapbox/mapbox-gl-draw";
// import { useDispatch } from "react-redux";


// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

// const Map = () => {
  
//   const dispatch = useDispatch();
//   const [routeCoords, setRouteCoords] = useState(3);
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-71.057198);
//   const [lat, setLat] = useState(42.360446);
//   const [zoom, setZoom] = useState(13);

//   // const setRoute = (e) => {
//   //   e.preventDefault();
//   //   setRouteCoords(coords);
//   //   console.log(routeCoords)
//   // };

//   const draw = new MapboxDraw({
//     // Instead of showing all the draw tools, show only the line string and delete tools.
//     displayControlsDefault: false,
//     controls: {
//       line_string: true,
//       trash: true
//     },
//     // Set the draw mode to draw LineStrings by default.
//     defaultMode: 'draw_line_string',
//     styles: [
//       // Set the line style for the user-input coordinates.
//       {
//         id: 'gl-draw-line',
//         type: 'line',
//         filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
//         layout: {
//           'line-cap': 'round',
//           'line-join': 'round'
//         },
//         paint: {
//           'line-color': '#438EE4',
//           'line-dasharray': [0.2, 2],
//           'line-width': 4,
//           'line-opacity': 0.3
//         }
//       },
//       // Style the vertex point halos.
//       {
//         id: 'gl-draw-polygon-and-line-vertex-halo-active',
//         type: 'circle',
//         filter: [
//           'all',
//           ['==', 'meta', 'vertex'],
//           ['==', '$type', 'Point'],
//           ['!=', 'mode', 'static']
//         ],
//         paint: {
//           'circle-radius': 1,
//           'circle-color': '#FFF'
//         }
//       },
//       // Style the vertex points.
//       {
//         id: 'gl-draw-polygon-and-line-vertex-active',
//         type: 'circle',
//         filter: [
//           'all',
//           ['==', 'meta', 'vertex'],
//           ['==', '$type', 'Point'],
//           ['!=', 'mode', 'static']
//         ],
//         paint: {
//           'circle-radius': 8,
//           'circle-color': '#438EE4'
//         }
//       }
//     ]
//   });

//   // Use the coordinates you drew to make the Map Matching API request
//   function updateRoute() {
//     // Set the profile
//     const profile = 'driving';
//     // Get the coordinates that were drawn on the map
//     const data = draw.getAll();
//     const lastFeature = data.features.length - 1;
//     const coords = data.features[lastFeature].geometry.coordinates;
//     // Format the coordinates
//     const newCoords = coords.join(';');
//     // Set the radius for each coordinate pair to 50 meters
//     const radius = coords.map(() => 50);
//     getMatch(newCoords, radius, profile);
    
//   }

//   // Make a Map Matching request
//   async function getMatch(coordinates, radius, profile) {
//   // Separate the radiuses with semicolons
//     const radiuses = radius.join(';');
//   // Create the query
//     const query = await fetch(
//       `https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${mapboxgl.accessToken}`,
//       { method: 'GET' }
//     );
//     const response = await query.json();
//   // Handle errors
//     if (response.code !== 'Ok') {
//       alert(
//         `The mapping program has thrown the following error: ${response.code} - ${response.message}.\n\nFor more information: https://docs.mapbox.com/api/navigation/map-matching/#map-matching-api-errors`
//       );
//       return;
//     }
//   // Get the coordinates from the response
//     const coords = response.matchings[0].geometry;
//   // Save coordinates to state variable and add route 
//     addRoute(coords);
//   }

//   // debugger

//   // Draw the Map Matching route as a new layer on the map
//   function addRoute(coords) {
//     // If a route is already loaded, remove it
//     if (map.current.getSource('route')) {
//       map.current.removeLayer('route');
//       map.current.removeSource('route');
//     } else {
//       // Add a new layer to the map
//       map.current.addLayer({
//         id: 'route',
//         type: 'line',
//         source: {
//           type: 'geojson',
//           data: {
//             type: 'Feature',
//             properties: {},
//             geometry: coords
//           }
//         },
//         layout: {
//           'line-join': 'round',
//           'line-cap': 'round'
//         },
//         paint: {
//           'line-color': 'red',
//           'line-width': 6,
//           'line-opacity': 0.7
//         }
//       });
//     }
//   };

//   function removeRoute() {
//     if (!map.current.getSource('route')) return;
//     map.current.removeLayer('route');
//     map.current.removeSource('route');
//   };
  
  
//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [lng, lat],
//       zoom: zoom
//     });
    
//     map.current.addControl(draw, 'top-left');
//     map.current.on('draw.create', updateRoute);
//     map.current.on('draw.update', updateRoute);
//     map.current.on('draw.delete', removeRoute);
//   }, [map.current]);
  
//   return (
//     <div className="outer-map-container">
      
//       <div ref={mapContainer} className="map-container" />
//       {/* <button className="set-route-button">Set Route</button> */}
//     </div>
//     );

// };

// export default Map; 



import { useEffect, useState, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

export const RideShowMap = () => {

  const [map, setMap] = useState(null);
  const mapRef = useRef(null);


  useEffect(() => {
    if (!map) {
      setMap(new window.google.maps.Map(mapRef.current, {zoom: 9, center: {lat: 37.772, lng: -122.214}}
    ))
    }
    
  }, [mapRef]);

  let encodedStr = "gnexFzbwdM|@qJn@kD`CkFn@eBz@_FMoH?c@H_@m@{@bCgFlDkGbDoIbC}FlGqGhHqGr@o@jB{CvB_JdCyEvEsH|@uC`@}D?iAUkGQwG?qISwCwAmHaBwIOaBOsFYgEe@}BuAwCqBeGo@uCsBoPPcF~BqRx@mKH_FRwKVeOr@kCbDoFbEgFx@wAfA{ELsBGyDFkJd@kDrByEtYsa@lAuC\\_GF{DKu@gAqMGcFVmCnLeg@hAqJtA}Sf@gD~AqBvH_EzGgBjFmFx@aBjCiJvBiGrB{ENqBYeDy@{H?{HQeCEqEZeBl@o@tAO|ChBh@ZtAN`BYhB{AfDaCxCQfDaBrHaJ~FqHrAkDz@kE|@mAv@]fGXnBAfBm@xCgBtFuE|B_AhBBRJJF`AcBn@aBvAqDzBaIlLeKfByDlBeBxJ_A`DaBrIqE|CkA`MqC~B{@nLuFrFeDdDOpJClB`Az@t@X`@HWZaA~@cDhAcCtCoDrF{GxEkGtIcMx@s@zBoBlEkLTu@XgAxCePjA_GdAmCtDgI`AaDtAiInEgPdGmUpCmMpFiQfD_KbBuExCqHnCiHlA{CbAh@dDhBzHlEfDjBLF`I~CfCbAFUhB_IpAyFFa@VD\\Fl@@dAOr@c@fBiC~AoFnAyGvFmX~C}QtKah@j@oC~A_CrAkArBwBrBuC`@sAb@aDvBqQnGig@zDm\\{@uIYmAcAgDRKFEzJeHf@e@nBoNuBcF[_A@uB@cAAw@Aq@EwL?eE?o@jAKhBOn@Gr@ITUd@sBrAwIj@uDcF}AMESOa@e@YcAAaG}@cE@aBdCeNoTaH_Cu@mA_@Ox@Mb@c@h@q@Ni@WYaABwAVgB~@{HpCqSnAwIz@oFr@cCb@MRx@yArDi@hDg@PeLuByP_DiSqD]GB}@R}HNeFt@kT\\eM^ud@DmLkCuJ{AqEw@uEk@oG]eEgAyBqAiBmBiFy@mCUeBf@eCd@aB`CgFpAmCfD}GVO`B{D~@gD|CmQt@yEiDmAuAc@Oa@CyBE{AQk@_@_@aAe@t@_Dp@yCxAyFxAgGx@gDoAk@m@a@Cc@Ck@?c@?]DUMy@q@c@_C{@{B{BsDgBwGqA}@UkRiEeGuB}@u@a@g@m@]e@HgJ|DgMnFys@~ZwRjIkDfA}@Ts@CoDqBu@YeI_FyQgL{FeEiKmI_QmN_FoF{HqCsMmEwHoDwKiFmD}AgC}ACUXaAlBwC~EyHjAgBzAiBhB{CvAsCxA}Ef@kBrDqN`BwFvCoHt@oB\\]j@Wn@DfAj@z@Z`Ag@\\iA@{@"

  // const route = new window.google.maps.Polyline({
  //   path: window.google.maps.geometry.encoding.decodePath(encodedStr),
  //   geodesic: true,
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 1.0,
  //   strokeWeight: 2,
  // });


  // route.setMap(map);

  return (
    <div className="google-map-container" ref={mapRef}>Map</div>
  )
  
};




// useEffect(() => {
//   if (map) {

//     const addMarker = (location, map) => {
//       const marker = new window.google.maps.Marker({
//         position: location,
//         map: map,
//         icon: {
//           path: window.google.maps.SymbolPath.CIRCLE,
//           scale: 4.5,
//           fillColor: "red",
//           fillOpacity: 0.8,
//           strokeWeight: 0
//       }
//       });
//       setMarkers(marks => [...marks, marker])
//     };

//     window.google.maps.event.addListener(map, "click", (event) => {
//       setCoords(allCoords => [...allCoords, event.latLng])
//       addMarker(event.latLng, map);
//     });
//   };
  
// }, [map]) ;

// const directionsRenderer = new window.google.maps.DirectionsRenderer({suppressMarkers: true});
// directionsRenderer.setMap(map);
// const directionsService = new window.google.maps.DirectionsService();

// const renderPath = () => {
//     let midpoints = []
//     for(let i = 1; i < coords.length - 1; i++) {
//       let point = coords[i];
//       let wayPoint = {};
//         wayPoint['location'] = new window.google.maps.LatLng(point);
//         midpoints.push(wayPoint);
//         wayPoint = {}
//     }

//     const request = {
//         origin: coords[0],
//         destination: coords[coords.length - 1],
//         travelMode: 'BICYCLING',
//         unitSystem: window.google.maps.UnitSystem.METRIC,
//         waypoints: midpoints
//     }
    
//     directionsService.route(request, (response, status) => {
//         if (status === 'OK') {
//             const poly = response.routes[0].overview_polyline
            
//             const distanceArray = response.routes[0].legs;
//             let totalDistance = 0;
//             distanceArray.forEach(dis => {
//                 let value = dis.distance.value / 1000;
//                 totalDistance += value;
//             })

//             const durationArray = response.routes[0].legs;
//             let totalDuration = 0;
//             durationArray.forEach(dur => {
//                 let value = dur.duration.value;
//                 totalDuration += value;

                
//               })

//             const pathPointSet = response.routes[0].overview_path;
              
//             setDistance(totalDistance);
//             setPolyline(poly);
//             setDuration(totalDuration);
//             setPathPoints(pathPointSet);
//             directionsRenderer.setDirections(response);
//         }
//     }); 
    
//     // passUpDistance(distance);
//     // passUpDuration(duration);
//     passUpMapData(distance, duration, polyline, pathPoints);

// };

// useEffect(() => {

//   if (coords.length > 1) {
//       renderPath();
//   }
// }, [coords])










const RideShowMapWrapper = () => {

return (
  <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    <RideShowMap/>
  </Wrapper>
)
};


export default RideShowMapWrapper;