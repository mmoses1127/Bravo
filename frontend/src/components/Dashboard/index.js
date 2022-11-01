import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRides } from "../../store/rides";
import RideIndexItem from "./RideIndexItem";
import { useSelector } from "react-redux";
import { getRides } from "../../store/rides";
import { Redirect } from "react-router-dom";
import "./Dashboard.css";
import { fetchUser, fetchUsers, getUser } from "../../store/users";
import avatar from "../../assets/mtb1.jpg";


const Dashboard = () => {
  const dispatch = useDispatch();
  const rides = useSelector(getRides);
  const currentSessionUser = useSelector(state => state.session.user);
  const user = useSelector(getUser(1));
  
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRides());
  }, []);
  
  if (!currentSessionUser) {
    return (
      <Redirect to="/"/>
      )
    };

  return (
    <>
    <div className="page-container-dash">
      <div className="profile-column">
        <div className="profile-container">
          <div className="profile-top">
            <div className="profile-image-container">
              <img className="profile-image" src={avatar}/>
            </div>
            <h1>{user?.name}</h1>
            <ul className="profile-stats-container">
              <li className="profile-stat">
                <p className='profile-tab'>Following</p>
                <h3 className='profile-num'>7</h3>
              </li>
              <li className="profile-stat">
                <p className='profile-tab'>Followers</p>
                <h3 className='profile-num'>5</h3>
              </li>
              <li className="profile-stat">
                <p className='profile-tab'>Rides</p>
                <h3 className='profile-num'>4</h3>
              </li>
            </ul>
          </div>
          <div className="profilebottom"></div>
        </div>
        <div className="my-links-container"></div>
        <div className="my-links-container"></div>
      </div>
      <div id="ride-index">
        <div className="feed-header">
          <div className="dropdown" id="feed-filter">
            <button className="clear-button">
              <h2>Following</h2>
              <span><i className="fa-solid fa-angle-down"></i></span>
            </button>
          </div>
        </div>
        {rides.map(ride => <RideIndexItem ride={Object.values(ride)[0]}/>)}
      </div>
      {/* <div className="announcements-column"></div> */}

    </div>
    </>
  );

};

export default Dashboard;