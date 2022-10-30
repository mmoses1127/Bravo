import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import smallLogo from '../../assets/small_logo.svg';
import { getRide } from '../../store/rides';


const RideIndexItem = ({ride}) => {
  const dispatch = useDispatch();
  const athlete_id = ride.athlete_id;
  const athlete = useSelector((state) => state.users[athlete_id]);

  // useEffect(() => {
  // }, [])

  return (
    <div className="feed-card">
      <div className="card-header">
        <img className="avatar-image" src={smallLogo} alt={ride.athleteId} />
        <div className="card-header-text">
          <h5>Athlete Name</h5>
          <br></br>
          <p>Realtive Time | Location</p>
        </div>

      </div>
      <div className="card-body">
        
      </div>
      <div className="card-media">
        
      </div>
      <div className="card-footer">
        
      </div>
    </div>
  );

};

export default RideIndexItem;