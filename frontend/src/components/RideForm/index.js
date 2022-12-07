import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { createRide } from '../../store/rides';
import { getCurrentUser } from '../../store/session';
import './RideForm.css';

const RideForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [elevation, setElevation] = useState(0);
  const [title, setTitle] = useState('My Bike Ride');
  const [description, setDescription] = useState('');
  let today = new Date().toISOString().slice(0, 10);
  let now = (new Date()).toLocaleTimeString().slice(0,5);
  if (now[1] === ':') now = '0' + now.slice(0,4);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(now);
  const [errors, setErrors] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  
  if (currentUser === null) return <Redirect to={`/`} />;
  
  const rideSubmitButton = document.getElementById('ride-submit-button')
  
  const handleClick = async (e) => {
    setLoading(true);
    if (photoFiles.length) {
      rideSubmitButton.setAttribute(`id`, `clicked-button`);
      rideSubmitButton.disabled = true;
    }
    let ride = await handleSubmit(e);
    history.push(`/rides/${ride.id}`);
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
    newRide.append('ride[elevation]', elevation);
    newRide.append('ride[date_time]', UTCTime);
    newRide.append('ride[athleteId]', currentUser.id);
    if (photoFiles.length) {
      photoFiles.forEach(photoFile => {
        newRide.append('ride[photos][]', photoFile);

      });
    };

    let returnedRide = dispatch(createRide(newRide))
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
    return returnedRide;
  };

  const handleFile = (e) => {
    const files = Object.values(e.currentTarget.files);
    setPhotoFiles(files);
  };

  return (
    <div className='page-container'>
      <h1 className='title-header'>Create Ride - Manual Entry</h1>
      <div id="manual-entry">
        {/* <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul> */}
        <form className="rideform-form" onSubmit={handleClick}>
          <div className='ride-entry-fields'>
            <fieldset>
              <legend>Distance</legend>
              <div className='inline-inputs'>
                <label className='stat-label'>
                  <input type='number' onChange={e => setDistance(e.target.value)} value={distance} />
                  <h4>kilometers</h4>
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Duration</legend>
              <div className='inline-inputs'>
                <label className='stat-label'>
                  <input type='number' onChange={e => setDuration(e.target.value)} value={duration} />
                  <h4>minutes</h4>
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Elevation</legend>
              <div className='inline-inputs'>
                <label className='stat-label'>
                  <input type='number' onChange={e => setElevation(e.target.value)} value={elevation} />
                  <h4>meters</h4>
                </label>
              </div>
            </fieldset>
          </div>

          <div className='ride-entry-fields'>
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
          </div>

          <div className='ride-entry-fields'>
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
                  <textarea rows='1' cols='60' onChange={e => setDescription(e.target.value)} value={description} />
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
      </div>
    </div>
  );

};

export default RideForm;