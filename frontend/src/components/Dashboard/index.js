import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRides } from "../../store/rides";
import RideIndexItem from "./RideIndexItem";
import { useSelector } from "react-redux";
import { getRides } from "../../store/rides";


const Dashboard = () => {
  const dispatch = useDispatch();
  const rides = useSelector(getRides)

  useEffect(() => {
    dispatch(fetchRides())
  }, [])


  return (
    <div id="ride-index">
      <h2>Rides Index</h2>
      {rides.map(ride => <RideIndexItem ride={Object.values(ride)[0]}/>)}
    </div>
  );

};

export default Dashboard;