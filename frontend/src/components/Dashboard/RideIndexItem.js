import smallLogo from '../../assets/small_logo.svg';
import { Link } from 'react-router-dom';
import Map from '../Map/Map';
import { createKudo, deleteKudo, getKudos } from '../../store/kudos';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/session';
import RideComments from '../RideComments';
import { useState } from 'react';
import CommentForm from '../RideComments/CommentForm';
import { getRideComments } from '../../store/comments';


const RideIndexItem = ({ride}) => {
  const dispatch = useDispatch();
  const parsedDuration = `${Math.floor(ride.duration / 3600)} hr ${Math.floor((ride.duration % 3600) / 60)} min`;
  const currentUser = useSelector(getCurrentUser);
  const parsedDateTime = new Date(ride.dateTime);
  const kudos = useSelector(getKudos);
  const rideKudos = kudos.filter(kudo => kudo['rideId'] === ride.id);
  const rideComments = useSelector(getRideComments(ride.id));
  let myKudo = rideKudos.filter(kudo => kudo['giverId'] === currentUser.id);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const longDate = parsedDateTime.toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  
  const giveKudo = (e) => {
    e.preventDefault();
    dispatch(createKudo({
      giver_id: currentUser.id,
      ride_id: ride.id
    }))
  };

  const removeKudo = (e) => {
    e.preventDefault();
    dispatch(deleteKudo(myKudo.id))
  };

  const handleComment = (e) => {
    e.preventDefault();
    setShowCommentForm(!showCommentForm);
  };

  const kudoButtonMaker = () => {
    if (myKudo.length > 0) {
      myKudo = myKudo[0];
      return (
        <button onClick={removeKudo} className='social-button'>
          <i className="fa-solid fa-thumbs-up orange"></i>
        </button>
      )
    } else {
      return (
        <button onClick={giveKudo} className='social-button'>
          <i className="fa-solid fa-thumbs-up"></i>
        </button>
      )
    };
  };

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
        {ride.photoUrls && 
          
          <div className="photos-container">
            {ride.photoUrls.slice(0, 2).map((photoUrl, i) => (
              <div className='thumb-container' key={i}>
                <img className='photo-thumb' src={photoUrl}/>
              </div>
            ))}
          </div>
        }

      </div>
      <div className="comments-and-messages">
        <div className='kudos-summary'>
          <div className='kudos-pics'>
            {rideKudos.length > 0 && 
              rideKudos.map(kudo => { return (
                <div key={kudo.id} className='tiny-kudo-wrapper'>
                  <img className='tiny-kudo-giver' src={kudo.profilePicUrl}/>
                </div>
              )
              })
            }
          </div>
          <p>{rideKudos.length > 0 ? `${rideKudos.length} kudos` : `Be the first to give Kudos!`} {rideComments.length > 0 && `| ${rideComments.length} comments`} </p>
        </div>
        <div className='social-buttons'>
          {kudoButtonMaker()}
          <button onClick={handleComment} className='social-button'>
            <i className="fa-regular fa-message"></i>
          </button>
        </div>
      </div>
      {<RideComments ride={ride}/>}
      {showCommentForm && <CommentForm rideId={ride.id}/>}
    </div>
  );

};

export default RideIndexItem;