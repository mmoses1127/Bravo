import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory, Redirect } from 'react-router-dom';
import { updateRide, getRide, fetchRide } from '../../store/rides';
import { getCurrentUser } from '../../store/session';
import '../RideForm/RideForm.css';

const RideEdit = () => {
  const history = useHistory();
  const currentUser = useSelector(getCurrentUser)
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const {rideId} = useParams();
  const ride = useSelector(getRide(rideId));
  const [distance, setDistance] = useState(ride?.distance);
  const [duration, setDuration] = useState(ride?.duration);
  const [elevation, setElevation] = useState(ride?.elevation);
  const [title, setTitle] = useState(ride?.title);
  const [description, setDescription] = useState(ride?.description);
  const [date, setDate] = useState(ride?.dateTime.slice(0,10));
  const [time, setTime] = useState('');
  const [changedDate, setChangedDate] = useState(false);
  const [errors, setErrors] = useState([]);

  
  useEffect(() => {
    if (!changedDate && ride) {
      let dateObject = new Date(ride.dateTime);
      let convertedDateTime = String(dateObject);
      const offset = dateObject.getTimezoneOffset()
      dateObject = new Date(dateObject.getTime() - (offset*60*1000))
      let convertedDate = dateObject.toISOString().split('T')[0]
      setDate(convertedDate)
      setTime(convertedDateTime.slice(16, 21))
      setChangedDate(true);
    }
  }, [changedDate, ride])

  useEffect(() => {
    dispatch(fetchRide(rideId));
  }, [dispatch, rideId]);
  
  if (currentUser === null || !ride) return <Redirect to={`/`} />;
  
  const handleClick = async (e) => {
    e.preventDefault();
    if (distance <= 0 || duration <= 0 || elevation <= 0) {
      alert('Your ride must have distance, duration, and elevation greater than 0.')
    } else {
      await handleSubmit(e);
      history.push(`/`);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const dateTime = new Date(`${date} 0${time}:00`);
    const UTCTime = dateTime.toUTCString();

    const newRide = {
      id: ride.id,
      title,
      description,
      distance,
      duration,
      elevation,
      athlete_id: user.id,
      date_time: UTCTime
    };

    dispatch(updateRide(newRide))
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

  return (
    <div className='page-container'>
      <h1>Manual Entry</h1>
      <div id="manual-entry">
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

          <div className='form-submit-area'>
            <button>Update</button>
            <Link to={`/dashboard`}>Cancel</Link>
          </div>

          {<ul className='errors'>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>}
          
        </form>
      </div>
    </div>
  );

};

export default RideEdit;