import smallLogo from '../../assets/small_logo.svg';
import { Link } from 'react-router-dom';
import Map from '../Map/Map';


const RideIndexItem = ({ride}) => {
  const parsedDuration = `${Math.floor(ride.duration / 3600)} hr ${Math.floor((ride.duration % 3600) / 60)} min`;
  const parsedDateTime = new Date(ride.dateTime)
  const longDate = parsedDateTime.toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  

  const handleKudo = () => {

  };

  const handleComment = () => {
    
  }


  return (
    <div className="feed-card">
      <div className="card-header">
        <div className='avatar-container'>
          <img className="avatar-image-medium" src={ride.profilePicUrl} alt="Avatar" />
        </div>
        <div className="card-header-text">
          <h4>{ride.username}</h4>
          <p>{longDate}</p>
        </div>
      </div>
      <div className="card-body">
        <div className="activity-symbol">
          <i className="fa-solid fa-bicycle"></i>
        </div>
        <div className="card-body-main">
          <h3><Link to={`/rides/${ride.id}`}>{ride.title}</Link></h3>
          <div className="card-body-text">
            <ul className="stats">
              <li>
                <p>Distance</p>
                <h4>{ride.distance}</h4>
              </li>
              <li>
                <p>Elev Gain</p>
                <h4>{ride.elevation}</h4>
              </li>
              <li>
                <p>Duration</p>
                <h4>{parsedDuration}</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-media">
        <div className="map-container">
          <Link to={`/rides/${ride.id}`}><img alt='static Mapbox map of the San Francisco bay area' src='https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.337798,37.810550,9.67,0.00,0.00/1000x600@2x?access_token=pk.eyJ1IjoibW1vc2VzMTEyNyIsImEiOiJjbDl5cWtkdnAwN2pwM3BrbnZsNTZzZHIzIn0.5DYp57TWNGkULiO3KhdVbg' /></Link>
        </div>
        <div className="photo-container">
          <div className="secondary-photo">
            {ride.photoUrl && <img src={ride.photoUrl}/>}
          </div>
          <div className="secondary-photo">
            
          </div>
          <div className="secondary-photo">
            
          </div>
        </div>
      </div>
      <div className="comments-and-messages">
        <div className='kudos-summary'>

        </div>
        <div className='social-buttons'>
          <button onClick={handleKudo} className='social-button'>
            <i className="fa-solid fa-thumbs-up"></i>
            </button>
          <button onClick={handleComment} className='social-button'>
            <i className="fa-regular fa-message"></i>
          </button>
        </div>
      </div>
    </div>
  );

};

export default RideIndexItem;