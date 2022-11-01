import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createRide } from '../../store/rides';
import './RideForm.css'

const RideForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => Object.values(state.session.user)[0]);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [elevation, setElevation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState([]);

  const handleClick = async (e) => {
    await handleSubmit(e);
    history.push(`/`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    let newRide = {
      title,
      description,
      distance,
      duration,
      elevation,
      athlete_id: user.id,
      date_time: `${date} 0${time}:00 UTC`
    };

    return dispatch(createRide(newRide))
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
        {/* <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul> */}
        <form onSubmit={handleClick}>
          <div className='ride-entry-fields'>
            <fieldset>
              <legend>Distance</legend>
              <div className='inline-inputs'>
                <label>
                  <input type='number' onChange={e => setDistance(e.target.value)} value={distance} />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Duration</legend>
              <div className='inline-inputs'>
                <label>
                  <input type='number' onChange={e => setDuration(e.target.value)} value={duration} />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Elevation</legend>
              <div className='inline-inputs'>
                <label>
                  <input type='number' onChange={e => setElevation(e.target.value)} value={elevation} />
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
            <button>Create</button>
            <Link to={`/dashboard`}>Cancel</Link>

          </div>
        </form>
      </div>
    </div>
  );

};

export default RideForm;