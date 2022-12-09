
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { createRide } from '../../store/rides';
import { getCurrentUser } from '../../store/session';
import './RideForm.css';
import RideMapWrapper from '../RideMap';

const CreateRideMap = () => {
  // RIDE FORM SECTION
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(getCurrentUser);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [polyline, setPolyline] = useState('');
  const [pathPoints, setPathPoints] = useState('');
  const [elevationArray, setElevationArray] = useState([])
  const [title, setTitle] = useState('My Bike Ride');
  const [description, setDescription] = useState('');
  let now = new Date().toISOString().slice();
  let dateObject = new Date();
  const offset = dateObject.getTimezoneOffset()
  dateObject = new Date(dateObject.getTime() - (offset*60*1000))
  let convertedDate = dateObject.toISOString().split('T')[0]
  let convertedTime = dateObject.toISOString().split('T')[1].slice(0, 5)
  const [date, setDate] = useState(convertedDate);
  const [time, setTime] = useState(convertedTime);
  const [elevation, setElevation] = useState(0);
  const [errors, setErrors] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  let returnedRide;

  if (currentUser === null) return <Redirect to={`/`} />;

  const rideSubmitButton = document.getElementById('ride-submit-button')

  const handleClick = async (e) => {
    if (distance <= 0) {
      alert('Your ride must have a distance greater than 0.')
    } else {
      setLoading(true);
      rideSubmitButton.setAttribute(`id`, `clicked-button`);
      rideSubmitButton.disabled = true;
      let ride = await handleSubmit(e);
      history.push(`/rides/${ride.id}`);
    }
  };

  const passUpMapData = (distance = 0, duration = 0, polyline = {}, elevationArray = [], elevation = 0) => {
    setDistance(distance);
    setDuration(duration);
    setPolyline(polyline);
    setPathPoints(pathPoints);
    setElevationArray(elevationArray);
    setElevation(elevation * 10 / 10)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const dateTime = new Date(`${date} 0${time}:00`);
    const UTCTime = dateTime.toUTCString();

    const newRide = new FormData();
    newRide.append('ride[title]', title);
    newRide.append('ride[distance]', distance);
    newRide.append('ride[description]', description);
    newRide.append('ride[duration]', duration);
    newRide.append('ride[gps_points]', elevationArray);
    newRide.append('ride[polyline]', polyline);
    newRide.append('ride[elevation]', elevation);
    newRide.append('ride[date_time]', UTCTime);
    newRide.append('ride[athleteId]', currentUser.id);
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

    return returnedRide
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
              <legend>Elevation (m)</legend>
              <div className='inline-inputs'>
                <label>
                  <input disabled type='number' value={elevation} />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Duration (mins)</legend>
              <div className='inline-inputs'>
                <label>
                  <input disabled type='number' value={duration} />
                </label>
              </div>
            </fieldset>
        </div>

        <div className='stat-entry-top'>
            <fieldset>
              <legend>Date</legend>
              <div className='inline-inputs date-time-field'>
                <label>
                  <input type='date' onChange={e => setDate(e.target.value)} value={date} />
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend>Time</legend>
              <div className='inline-inputs date-time-field'>
                <label>
                  <input type='time' onChange={e => setTime(e.target.value)} value={time} />
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
            <legend >Description</legend>
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
          <button className='relative-button' id='ride-submit-button'>Create
            {loading && <div className="spin"></div>}
          </button>
          <Link to={`/dashboard`}>Cancel</Link>
        </div>

      </form>



      <div className="outer-map-container">
        <RideMapWrapper passUpMapData={passUpMapData} />
      </div>
    </div>



    );

};

export default CreateRideMap;