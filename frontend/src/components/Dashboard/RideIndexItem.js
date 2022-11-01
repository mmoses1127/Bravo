import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import smallLogo from '../../assets/small_logo.svg';
import { getRide } from '../../store/rides';
import { fetchUser } from '../../store/users';


const RideIndexItem = ({ride, athlete}) => {
  const dispatch = useDispatch();
  const parsedDuration = `${Math.floor(ride.duration / 3600)} hr ${Math.floor((ride.duration % 3600) / 60)} min`;


  return (
    <div className="feed-card">
      <div className="card-header">
        <img className="avatar-image" src={smallLogo} alt="Avatar" />
        <div className="card-header-text">
          <h5>{ride.username}</h5>
          <br></br>
          <p>{ride.dateTime}</p>
        </div>
      </div>
      <div className="card-body">
        <div className="activity-symbol">
          <i className="fa-light fa-bicycle"></i>
        </div>
        <div className="card-body-main">
          <h3>{ride.title}</h3>
          <div className="card-body-text">
            <ul className="stats">
              <li>
                <p>Distance</p>
                <h4>{ride.distance}</h4>
              </li>
              <li>
                <p>Elev Gain</p>
                <h4>{ride.elevation}</h4>
              </li>
              <li>
                <p>Duration</p>
                <h4>{parsedDuration}</h4>
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