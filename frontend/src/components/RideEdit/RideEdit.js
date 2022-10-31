import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { updateRide, getRide } from '../../store/rides';
import '../RideForm/RideForm.css';

const RideEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const {rideId} = useParams();
  const ride = useSelector(getRide(rideId));
  const [distance, setDistance] = useState(ride.distance);
  const [duration, setDuration] = useState(ride.duration);
  const [elevation, setElevation] = useState(ride.elevation);
  const [title, setTitle] = useState(ride.title);
  const [description, setDescription] = useState(ride.description);
  const [date, setDate] = useState(ride.date);
  const [time, setTime] = useState(ride.time);


  const handleSubmit = (e) => {
    e.preventDefault();

    const newRide = {
      title,
      description,
      distance,
      duration,
      elevation,
      athlete_id: user.id,
      dateTime: Date()
    };

    dispatch(updateRide(newRide))
  }


  return (
    <div className='page-container'>
      <h1>Manual Entry</h1>
      <div id="manual-entry">
        <form onSubmit={handleSubmit}>
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

export default RideEdit;