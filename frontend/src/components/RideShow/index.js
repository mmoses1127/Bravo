import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useHistory, Redirect } from "react-router-dom";
import { getRide, fetchRide, deleteRide } from "../../store/rides";
import './RideShow.css';
import { getCurrentUser } from "../../store/session";
import PhotoModal from "../PhotoModal";
import RideShowMapWrapper from "./RideShowMap";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';



const RideShow = () => {
  const history = useHistory();
  const currentUser = useSelector(getCurrentUser);
  const {rideId} = useParams();
  const dispatch = useDispatch();
  const ride = useSelector(getRide(rideId));
  const [openModal, setOpenModal] = useState(false);

  
  useEffect(() => {
    dispatch(fetchRide(rideId));
  }, [rideId, dispatch]);
  
  if (currentUser === null) return <Redirect to={`/`} />;
  
  if (!ride) return null;

  const handleDelete = () => {
    if (window.confirm('Are you sure? Deleting a ride cannot be undone.')) {
      dispatch(deleteRide(rideId));
      history.push(`/dashboard`);
    };
  };

  const showPhotoModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setOpenModal(false)
  }

  let parsedDuration;
  const parsedDateTime = new Date(ride.dateTime)
  const longDate = parsedDateTime.toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  if (ride) {
    const hours = Math.floor(ride.duration / 60);
    let mins = Math.floor((ride.duration % 60));
    if (mins < 10) mins = '0' + mins;
    parsedDuration = `${hours}:${mins}`;
  }

  let elevationData;
  if (ride.gpsPoints) {
    elevationData = ride.gpsPoints.slice(1).map((elevation, i) => {
      return {elevation: Math.round(elevation * 10) / 10, index: i}
    })
  }

  return (
    <div className="page-container-show">
      {openModal && < PhotoModal ride={ride} closeModal={closeModal}/>}
      <div className="ride-show-header">
        <div className="ride-show-header-left">
          <img src="https://d3nn82uaxijpm6.cloudfront.net/assets/svg/badges_multicolor_summit_small-a9f1366377ea9bcfb95dd73917f97b674a8c64d9f00bb029d58c23730158b328.svg" alt="Strava Badge" />
          <h2>{ride.username} - Ride</h2>
        </div>
        <div className="social-header">
          {currentUser && ride.athleteId === currentUser.id && 
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
            <img className="profile-show-image" src={ride.profilePicUrl} alt='Profile'></img>
          </div>
          <div className="show-main-text-img">
            <div className="show-main-text">
              <p>{longDate}</p>
              <h2>{ride.title}</h2>
              <p>{ride.description}</p>
            </div>
            <div className="show-main-img">
              {ride.photoUrls?.slice(0, 5).map((photoUrl, i) => (
                <div key={i} className='small-square-thumb-box'>
                  <img onClick={showPhotoModal} className='photo-thumb' alt='Ride' src={photoUrl}/>
                </div>
              ))}
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
            {ride.elevation > 0 && 
            <li className="show-stat">
              <h3>{Math.round(ride.elevation * 10) / 10} m</h3>
              <p>Elevation</p>
              </li>
            }
          </ul>
        </div>
      </div>
      {ride.gpsPoints?.length > 0 &&
      <>
      <div className="ride-show-map">
          <RideShowMapWrapper ride={ride}/>
      </div>
      <div className="ride-show-elevation">
        <ResponsiveContainer width="100%" >
          <AreaChart data={elevationData} margin={{top: 10, right: 30}}>
              <CartesianGrid />
              <XAxis tick={false}/>
              <YAxis padding={{ top: 50 }}/>
              <Tooltip />
              <Area type="monotone" dataKey="elevation" fill="gray" stroke="gray"
                  activeDot={{ r: 8 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      </>
      }
    </div>
  )
};

export default RideShow;