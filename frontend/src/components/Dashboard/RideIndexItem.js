import smallLogo from '../../assets/small_logo.svg';


const RideIndexItem = ({ride}) => {
  console.log(ride)


  return (
    <div className="ride-index-item">
      <div className="ride-item-header">
        <img className="avatar-image" src={smallLogo} alt={ride.athleteId} />
        
      </div>
      <div className="ride-item-stats">
        
      </div>
      <div className="ride-item-media">
        
      </div>
    </div>
  );

};

export default RideIndexItem;