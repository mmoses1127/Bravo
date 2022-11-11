import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RideIndexItem from "./RideIndexItem";
import { getRides, getUserRides, getLatestRide, fetchRides } from "../../store/rides";
import { Redirect, useParams, useHistory, Link } from "react-router-dom";
import "./Dashboard.css";
import { fetchUsers, getUser } from "../../store/users";
import { getCurrentUser } from "../../store/session";
import smallLogo from "../../assets/small_logo.svg";
import { fetchKudos, getKudos } from "../../store/kudos";
import { fetchComments, getComments } from "../../store/comments";
import PhotoModal from "../PhotoModal";

const Dashboard = () => {
  let {userId} = useParams();
  userId = parseInt(userId)
  const history = useHistory();
  const dispatch = useDispatch();
  let rides = useSelector(getRides);
  let userRides = useSelector(getUserRides(userId));
  const kudos = useSelector(getKudos);
  const comments = useSelector(getComments);
  const currentUser = useSelector(getCurrentUser);
  const user = useSelector(getUser(userId));
  const profileUser = user? user : currentUser;
  const currentUserRides = useSelector(getUserRides(profileUser?.id));
  const latestRide = getLatestRide(currentUserRides);
  const userKudos = useSelector(getKudos).filter(kudo => kudo?.giverId === profileUser?.id);
  const userComments = useSelector(getComments).filter(comment => comment.commenterId === profileUser?.id)
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false)
  };

  useEffect(() => {
    dispatch(fetchUsers());
    if (rides.length < 2) {dispatch(fetchRides())};
    if (kudos?.length < 1) dispatch(fetchKudos());
    if (comments?.length < 1) dispatch(fetchComments());
  }, [userId]);

  
  if (currentUser === null) {
    return (
      <Redirect to="/"/>
      )
    };
    
  const handleRedirect = () => {
    userId ? history.push(`/dashboard`) : history.push(`/users/${currentUser.id}`);
  };

  return (
    <>
    <div className="page-container-dash">
      <div className="profile-column">
        <div className="profile-container">
          <div className="profile-top">
            <div className="profile-image-container">
              <img className="profile-image" src={user ? user.profilePicUrl : profileUser.profilePicUrl}/>
            </div>
            <h1>{user ? user.name : profileUser.name}</h1>
            <ul className="profile-stats-container">
              <li className="profile-stat">
                <p className='profile-tab'>Comments</p>
                <h3 className='profile-num'>{userComments.length}</h3>
              </li>
              <li className="profile-stat">
                <p className='profile-tab'>Kudos</p>
                <h3 className='profile-num'>{userKudos.length}</h3>
              </li>
              <li className="profile-stat">
                <p className='profile-tab'>Rides</p>
                <h3 className='profile-num'>{currentUserRides.length}</h3>
              </li>
            </ul>
          </div>
          <div className="profile-bottom">
            <div><p>Latest Ride</p></div>
            <div>
              <h4>{latestRide ? <Link to={`/rides/${latestRide.id}`}>{latestRide.title} | {new Date(latestRide.dateTime).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</Link> : 'No Recent Ride'}</h4>
              <p></p>
            </div>
          </div>
        <div className="my-links-container">
          <div className="links-bar">
            <div className="links-item">
              <PhotoModal />
              <h3>Project Repo</h3>
              <a href="https://github.com/mmoses1127"><i className="fa-brands fa-github footer-icon"/></a>
            </div>
            {/* <div className="links-item">
              <h3>Michael's Github</h3>
              <a href="https://github.com/mmoses1127"><i className="fa-brands fa-github footer-icon"/></a>
            </div> */}
          </div>
        </div>
        </div>
      </div>
      <div id="ride-index">
        <div className="feed-header">
          <div onMouseEnter={openMenu} onMouseLeave={closeMenu} className="feed-filter">
            <button className="clear-button">
              <h3>{userId ? 'User Rides' : 'All Rides'}</h3>
              <span><i className="fa-solid fa-angle-down"></i></span>
            </button>
            {showMenu && 
            <ul className='feed-dropdown-list'>
              <li onClick={handleRedirect} className="dropdown-item">
                {userId ? 'All Rides' : 'User Rides'}
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
        {userId > 0 && userRides.map(ride => <RideIndexItem key={ride.id} ride={ride}/>)}
        {!userId && rides.map(ride => <RideIndexItem key={ride.id} ride={ride}/>)}
      </div>
    </div>
    </>
  );

};

export default Dashboard;