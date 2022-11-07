import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RideIndexItem from "./RideIndexItem";
import { getRides, getUserRides, getLatestRide, fetchRides, fetchMyRides } from "../../store/rides";
import { Redirect, useParams, useHistory } from "react-router-dom";
import "./Dashboard.css";
import { fetchUser, fetchUsers, getUser } from "../../store/users";
import avatar from "../../assets/mtb1.jpg";
import { getCurrentUser } from "../../store/session";
import smallLogo from "../../assets/small_logo.svg";
import { fetchKudos, getKudos } from "../../store/kudos";
import RideComments from "../RideComments";

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const rides = useSelector(getRides);
  const currentUser = useSelector(getCurrentUser);
  const currentUserRides = useSelector(getUserRides(currentUser.id));
  const latestActivity = getLatestRide(currentUserRides);
  const [showMenu, setShowMenu] = useState(false);
  const {userId} = useParams();
  const  myKudos = useSelector(getKudos).filter(kudo => kudo.giverId === currentUser.id)
  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false)
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchKudos());
    userId ? dispatch(fetchMyRides(currentUser.id)) : dispatch(fetchRides());
  }, [userId]);

  
  if (currentUser === null) {
    return (
      <Redirect to="/"/>
      )
    };
    
  const handleRedirect = () => {
    userId ? history.push(`/dashboard`) : history.push(`/dashboard/users/${currentUser.id}/rides`);
  };

  return (
    <>
    <div className="page-container-dash">
      <div className="profile-column">
        <div className="profile-container">
          <div className="profile-top">
            <div className="profile-image-container">
              <img className="profile-image" src={currentUser.profilePicUrl}/>
            </div>
            <h1>{currentUser?.name}</h1>
            <ul className="profile-stats-container">
              <li className="profile-stat">
                <p className='profile-tab'>Following</p>
                <h3 className='profile-num'>7</h3>
              </li>
              <li className="profile-stat">
                <p className='profile-tab'>Kudos</p>
                <h3 className='profile-num'>{myKudos.length}</h3>
              </li>
              <li className="profile-stat">
                <p className='profile-tab'>Rides</p>
                <h3 className='profile-num'>{currentUserRides.length}</h3>
              </li>
            </ul>
          </div>
          <div className="profile-bottom">
            <div><p>Latest Activity</p></div>
            <div>
              <h4>{latestActivity ? Object.values(latestActivity)[0].title : 'No Recent Activity'}</h4>
              <p></p>
            </div>
          </div>
        <div className="my-links-container">
          <div className="links-bar">
            <div className="links-item">
              <h3>Project Repo</h3>
              <a href="https://github.com/mmoses1127"><i className="fa-brands fa-github footer-icon"/></a>
            </div>
            <div className="links-item">
              <h3>Michael's Github</h3>
              <a href="https://github.com/mmoses1127"><i className="fa-brands fa-github footer-icon"/></a>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div id="ride-index">
        <div className="feed-header">
          <div onMouseEnter={openMenu} onMouseLeave={closeMenu} className="feed-filter">
            <button className="clear-button">
              <h3>{userId ? 'My Rides' : 'Following'}</h3>
              <span><i className="fa-solid fa-angle-down"></i></span>
            </button>
            {showMenu && 
            <ul className='feed-dropdown-list'>
              <li onClick={handleRedirect} className="dropdown-item">
                {userId ? 'Following' : 'My Rides'}
              </li>
            </ul>
            }
          </div>
        </div>
        <div className="dashboard-top-header">
          <div className="dash-top-section">
            <div className="dash-top-left-image">
            </div>
            <div className="dash-top-right-image">
            </div>
          </div>
          <div className="dash-bottom-section">
            <div className="dash-bottom-logo">
              <img className="small-logo" src={smallLogo} />
            </div>
            <div className="dash-bottom-text">
              <h3>Strava Welcomes All</h3>
              <p>Running, biking, and all the rest. Get out there!</p>
            </div>
          </div>
        </div>
        {rides.reverse().map(ride => <RideIndexItem key={ride.id} ride={Object.values(ride)[0]}/>)}
      </div>
    </div>
    </>
  );

};

export default Dashboard;