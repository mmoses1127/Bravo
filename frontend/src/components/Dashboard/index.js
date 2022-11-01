import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRides } from "../../store/rides";
import RideIndexItem from "./RideIndexItem";
import { useSelector } from "react-redux";
import { getRides } from "../../store/rides";
import { Redirect } from "react-router-dom";
import "./Dashboard.css";
import { fetchUsers } from "../../store/users";


const Dashboard = () => {
  const dispatch = useDispatch();
  const rides = useSelector(getRides);
  const currentUser = useSelector(state => state.session.user);
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchRides());
    // dispatch(fetchUsers());
  }, []);

  if (!currentUser) {
    return (
      <Redirect to={`/`}/>
    )
  };

  return (
    <>
    <div className="page-container-dash">
      <div className="profile-column">
        <div className="profile-container">
          <div className="profile-top">
            <div className="profile-image-container"></div>
            <h1>{currentUser.name}</h1>
            <ul className="profile-stats-container">
              <li className="profile-stat"></li>
              <li className="profile-stat"></li>
              <li className="profile-stat"></li>
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