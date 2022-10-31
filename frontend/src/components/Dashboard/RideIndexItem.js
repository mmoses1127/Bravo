import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import smallLogo from '../../assets/small_logo.svg';
import { getRide } from '../../store/rides';
import { fetchUser } from '../../store/users';


const RideIndexItem = ({ride}) => {
  const dispatch = useDispatch();
  const athlete_id = ride.athlete_id;
  // const athlete = useSelector((state) => state.users[athlete_id]);

  useEffect(() => {
    dispatch(fetchUser(athlete_id));
  }, []);

  return (
    <div className="feed-card">
      <div className="card-header">
        <img className="avatar-image" src={smallLogo} alt="Avatar" />
        <div className="card-header-text">
          <h5>{athlete.email}</h5>
          <br></br>
          <p>Relative Time | Location</p>
        </div>
      </div>
      <div className="card-body">
        <div className="activity-symbol">
          <i className="fa-light fa-bicycle"></i>
        </div>
        <div className="card-body-main">
          <h3>Ride Title</h3>
          <div className="card-body-text">
            <ul className="stats">
              <li>
                <p>Distance</p>
                <h4>25.0</h4>
              </li>
              <li>
                <p>Elev Gain</p>
                <h4>300 m</h4>
              </li>
              <li>
                <p>Time</p>
                <h4>2h 9m</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-media">
        <div className="map-container">

        </div>
        <div className="photo-container">
          <div className="secondary-photo">

          </div>
          <div className="secondary-photo">
            
          </div>
          <div className="secondary-photo">
            
          </div>
        </div>
      </div>
      <div className="card-footer">
        
      </div>
    </div>
  );

};

export default RideIndexItem;