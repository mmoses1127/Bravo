
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createRide } from '../../store/rides';
import { getCurrentUser } from '../../store/session';
import './RideForm.css';
import RideMapWrapper from '../RideMap';

const CreateRideMap = () => {
  // RIDE FORM SECTION
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(getCurrentUser);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [polyline, setPolyline] = useState('');
  const [pathPoints, setPathPoints] = useState('');
  const [elevationArray, setElevationArray] = useState([])
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [elevation, setElevation] = useState('');
  const [errors, setErrors] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  let returnedRide;

  const handleClick = async (e) => {
    await handleSubmit(e);
    // history.push(`/`);
  }

  // const passUpDistance = (currentDistance) => {
  //   setDistance(Math.round(currentDistance * 10) / 10);
  // };

  // const passUpDuration = (currentDuration) => {
  //   setDuration(Math.round(currentDuration * 10) / 10);
  // };

  const passUpMapData = (distance = 0, duration = 0, polyline = {}, pathPoints = [], elevationArray = []) => {
    setDistance(Math.round(distance * 10) / 10);
    setDuration(Math.round(duration * 10) / 10);
    setPolyline(polyline);
    setPathPoints(pathPoints);
    setElevationArray(elevationArray);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newRide = new FormData();
    newRide.append('ride[title]', title);
    newRide.append('ride[distance]', distance);
    newRide.append('ride[description]', description);
    newRide.append('ride[duration]', duration);
    console.log(elevationArray)
    newRide.append('ride[gps_points]', elevationArray);
    newRide.append('ride[polyline]', polyline);
    newRide.append('ride[elevation]', elevation);
    newRide.append('ride[date_time]', `${date} 0${time}:00 UTC`);
    newRide.append('ride[athleteId]', currentUser.id);
    // newRide.append('ride[gps_points]', routeCoords);
    if (photoFiles) {
      photoFiles.forEach(photoFile => {
        newRide.append('ride[photos][]', photoFile);
      });
    };

    returnedRide = dispatch(createRide(newRide))
    .catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  const handleFile = (e) => {
    const files = Object.values(e.currentTarget.files);
    setPhotoFiles(files);
  };



  // RETURN SECTION
  
  return (
    <div className='page-container-map-entry'>
      <form className="rideform-form-map" onSubmit={handleClick}>
        <h1 className='title-header'>Create Ride - Map Entry</h1>
        <div className='stat-entry-top'>
          <div className='distance-and-elev'>
          <fieldset>
              <legend>Distance (km)</legend>
              <div className='inline-inputs'>
                <label>
                  <input disabled type='number' value={distance} />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Elevation</legend>
              <div className='inline-inputs'>
                <label>
                  <input disabled type='number' value={elevation} />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Date</legend>
              <div className='inline-inputs'>
                <label>
                  <input type='date' onChange={e => setDate(e.target.value)} value={date} />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Time</legend>
              <div className='inline-inputs'>
                <label>
                  <input type='time' onChange={e => setTime(e.target.value)} value={time} />
                </label>
              </div>
            </fieldset>            

            <fieldset>
              <legend>Duration (mins)</legend>
              <div className='inline-inputs'>
                <label>
                  <input disabled type='number' value={Math.round(duration / 60 * 10) / 10} />
                </label>
              </div>
            </fieldset>

          </div>
        </div>
        <div className='stat-entry-bottom'>

          <fieldset>
            <legend>Title</legend>
            <div className='inline-inputs'>
              <label>
                <input type='text' onChange={e => setTitle(e.target.value)} value={title} />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Description</legend>
            <div className='inline-inputs'>
              <label>
                <textarea className='map-textarea' rows='1' cols='60' onChange={e => setDescription(e.target.value)} value={description} />
              </label>
            </div>
          </fieldset>

        </div>

        <div className='ride-entry-fields'>
          <fieldset>
            <legend>Photos</legend>
            <div className='photo-upload-zone'>
              <label>
                <input className='file-input' type='file' onChange={handleFile} multiple></input>
              </label>
            </div>
          </fieldset>
        </div>

        <div className='form-submit-area'>
          <button>Create</button>
          <Link to={`/dashboard`}>Cancel</Link>
        </div>

      </form>



      <div className="outer-map-container">
        {/* <div ref={mapContainer} className="map-container" /> */}
        {/* <button className="set-route-button">Set Route</button> */}
        <RideMapWrapper passUpMapData={passUpMapData} />
      </div>
    </div>



    );

};

export default CreateRideMap;