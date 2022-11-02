import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getRide, fetchRide } from "../../store/rides";
import RideIndexItem from "../Dashboard/RideIndexItem";
import './RideShow.css';
import avatar from "../../assets/mtb1.jpg";
import Map from "../Map/Map";



const RideShow = () => {
  const currentUser = useSelector(state => Object.values(state.session.user)[0])
  const {rideId} = useParams();
  const dispatch = useDispatch();
  const ride = useSelector(getRide(rideId));
  useEffect(() => {
    dispatch(fetchRide(rideId));
  }, []);
  
  if (!ride) return null;

  const parsedDuration = `${Math.floor(ride.duration / 3600)} hr ${Math.floor((ride.duration % 3600) / 60)} min`;

  return (
    <div className="page-container-show">
      <div className="ride-show-header">
        <h2>{ride.username} - {ride.title}</h2>
        <div className="social-header">
          {ride.athleteId === currentUser.id && 
          <Link to={`/rides/${rideId}/edit`} ><i className="fa-solid fa-pencil"></i></Link>
          }
        </div>
      </div>
      <div className="ride-show-main">
        <div className="show-main-box">
          <div className="profile-show-image-container">
            <img className="profile-show-image" src={avatar} alt='Profile Image'></img>
          </div>
          <div className="show-main-text-img">
            <div className="show-main-text">
              <p>{ride.dateTime}</p>
              <h2>{ride.title}</h2>
            </div>
            <div className="show-main-img">
              <img className="small-square-image-box"></img>
              <img className="small-square-image-box"></img>
              <img className="small-square-image-box"></img>
            </div>
          </div>
        </div>
        <div className="show-main-box">
          <ul className="inline-stats-container">
            <li className="show-stat">
              <h3>{ride.distance} km</h3>
              <h2>Distance</h2>
            </li>
            <li className="show-stat">
              <h3>{parsedDuration}</h3>
              <h2>Moving Time</h2>
            </li>
            <li className="show-stat">
              <h3>{ride.elevation}</h3>
              <h2>Elevation</h2>
              </li>
          </ul>
        </div>
      </div>
      <div className="ride-show-map">
        <Map />
      </div>
      <div className="ride-show-elevation"></div>
    </div>
  )
};

export default RideShow;