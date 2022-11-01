import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getRide, fetchRide } from "../../store/rides";
import RideIndexItem from "../Dashboard/RideIndexItem";



const RideShow = () => {
  const {rideId} = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchRide(rideId));
  }, []);
  
  const ride = useSelector(getRide);

  return (
    <div className="page-container">
      <div className="ride-show-header">
        <h2>hiii</h2>
        <div className="social-header"></div>
          <Link to={`/activities/${rideId}/edit`} ><i className="fa-solid fa-pencil"></i></Link>
      </div>
      <div className="ride-show-main"></div>
      <div className="ride-show-map"></div>
      <div className="ride-show-elevation"></div>
    </div>
  )
};

export default RideShow;