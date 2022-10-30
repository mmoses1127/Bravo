import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRides } from "../../store/rides";
import RideIndexItem from "./RideIndexItem";
import { useSelector } from "react-redux";
import { getRides } from "../../store/rides";
import { Redirect } from "react-router-dom";
import "./Dashboard.css";


const Dashboard = () => {
  const dispatch = useDispatch();
  const rides = useSelector(getRides);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchRides())
  }, []);

  if (!user) {
    return (
      <Redirect to={`/`}/>
    )
  };

  return (
    <>
    <div className="page-container">
      <div className="profile-column">
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
        <h2>Rides Index</h2>
        {rides.map(ride => <RideIndexItem ride={Object.values(ride)[0]}/>)}
      </div>
      <div className="announcements-column">
        
        </div>

    </div>
    </>
  );

};

export default Dashboard;