import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { getRide, fetchRide, deleteRide } from "../../store/rides";
import RideIndexItem from "../Dashboard/RideIndexItem";
import './RideShow.css';
import avatar from "../../assets/mtb1.jpg";
import Map from "../Map/Map";
import { getCurrentUser } from "../../store/session";



const RideShow = () => {
  const history = useHistory();
  const currentUser = useSelector(getCurrentUser);
  const {rideId} = useParams();
  const dispatch = useDispatch();
  const ride = useSelector(getRide(rideId));
  
  useEffect(() => {
    dispatch(fetchRide(rideId));
  }, []);
  
  if (!ride) return null;

  const handleDelete = () => {
    // alert('Are you sure? Deleting an activity cannot be undone')
    if (window.confirm('Are you sure? Deleting a ride cannot be undone.')) {
      dispatch(deleteRide(rideId));
      history.push(`/dashboard`);
    };
  };

  let parsedDuration;
  const parsedDateTime = new Date(ride.dateTime)
  const longDate = parsedDateTime.toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // const parsedDuration = `${Math.floor(ride.duration / 3600)} hr ${Math.floor((ride.duration % 3600) / 60)} min`;
  if (ride) {
    const hours = Math.floor(ride.duration / 3600);
    let mins = Math.floor((ride.duration % 3600) / 60);
    if (mins < 10) mins = '0' + mins;
    parsedDuration = `${hours}:${mins}`;
  }

  return (
    <div className="page-container-show">
      <div className="ride-show-header">
        <div className="ride-show-header-left">
          <img src="https://d3nn82uaxijpm6.cloudfront.net/assets/svg/badges_multicolor_summit_small-a9f1366377ea9bcfb95dd73917f97b674a8c64d9f00bb029d58c23730158b328.svg" alt="Strava Badge" />
          <h2>{ride.username} - Ride</h2>
        </div>
        <div className="social-header">
          {ride.athleteId === currentUser.id && 
          <>
            <button className="delete-button" onClick={handleDelete}><i className="fa-solid fa-trash"/></button>
            <Link className='edit-link' to={`/rides/${rideId}/edit`}><i className="fa-solid fa-pencil"></i></Link>
          </>
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
              <p>{longDate}</p>
              <h2>{ride.title}</h2>
              <p>{ride.description}</p>
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
              <p>Distance</p>
            </li>
            <li className="show-stat">
              <h3>{parsedDuration}</h3>
              <p>Moving Time</p>
            </li>
            <li className="show-stat">
              <h3>{ride.elevation}</h3>
              <p>Elevation</p>
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