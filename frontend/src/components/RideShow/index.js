import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRide } from "../../store/rides";
import RideIndexItem from "../Dashboard/RideIndexItem";
import { fetchRides } from "../../store/rides";
import { useDispatch } from "react-redux";
import { getRides } from "../../store/rides";



const RideShow = () => {
  const {rideId} = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchRides());
  }, []);
  
  const rides = useSelector(getRides);
  console.log(rides)

  return (
    <div className="page-container">
      <div className="ride-show-header">
        <h2>hiii</h2>
        <div className="social-header"></div>
      </div>
      <div className="ride-show-main"></div>
      <div className="ride-show-map"></div>
      <div className="ride-show-elevation"></div>
    </div>
  )
};

export default RideShow;