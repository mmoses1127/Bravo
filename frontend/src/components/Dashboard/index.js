import { useEffect } from "react";
import { useDispatch } from "react-redux";
import csrfFetch from "../../store/csrf";


const Dashboard = () => {
  const dispatch = useDispatch();
  const rides = useSelector((state = {}) => {
    return state.rides;
  });

  useEffect(() => {
    dispatch(fetchRides())
  }, [])


  return (
    <div id="ride-index">
      {rides.map(ride => {<RideIndexItem ride={ride}/>})}
    </div>
  );

};

export default Dashboard;