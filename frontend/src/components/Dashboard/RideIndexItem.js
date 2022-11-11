import { Link } from 'react-router-dom';
import { createKudo, deleteKudo, getKudos } from '../../store/kudos';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/session';
import RideComments from '../RideComments';
import { useState } from 'react';
import CommentForm from '../RideComments/CommentForm';
import { getRideComments } from '../../store/comments';
import PhotoModal from '../PhotoModal';


const RideIndexItem = ({ride}) => {
  const dispatch = useDispatch();
  const parsedDuration = `${Math.floor(ride.duration / 60)} hr ${Math.floor((ride.duration % 60))} min`;
  const currentUser = useSelector(getCurrentUser);
  const parsedDateTime = new Date(ride.dateTime);
  const kudos = useSelector(getKudos);
  const rideKudos = kudos.filter(kudo => kudo['rideId'] === ride.id);
  const rideComments = useSelector(getRideComments(ride.id));
  let myKudo = rideKudos.filter(kudo => kudo['giverId'] === currentUser.id);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const longDate = parsedDateTime.toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const showPhotoModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setOpenModal(false)
  }
  
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
      {openModal &&
        <PhotoModal ride={ride} closeModal={closeModal}/>
      }
      <div className="card-header">
        <div className='avatar-container'>
          <img className="avatar-image-medium" src={ride.profilePicUrl} alt="Avatar" />
        </div>
        <div className="card-header-text">
          <h4><Link className='blue-link' to={`/users/${ride.athleteId}`}>{ride.username}</Link></h4>
          <p>{longDate}</p>
        </div>
      </div>
      <div className="card-body">
        <div className="activity-symbol">
          <i className="fa-solid fa-bicycle"></i>
        </div>
        <div className="card-body-main">
          <h3><Link className='blue-link' to={`/rides/${ride.id}`}>{ride.title}</Link></h3>
          <div className="card-body-text">
            <ul className="stats">
              <li>
                <p>Distance</p>
                <h4>{ride.distance}</h4>
              </li>
              {ride.elevation > 0 && 
                <li>
                  <p>Elev Gain</p>
                  <h4>{Math.round(ride.elevation * 10) / 10}</h4>
                </li>
              }
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
          {
            ride.polyline && <Link to={`rides/${ride.id}`}><img className='ride-static-map' src={`https://maps.googleapis.com/maps/api/staticmap?scale=2&size=500x250&path=color:0xf55142FF|enc:${ride.polyline}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`} alt="Ride Map" /></Link>
          }
        </div>
        {ride.photoUrls && 
          
          <div className="photos-container">
            {ride.photoUrls.slice(0, 2).map((photoUrl, i) => (
              <div className='thumb-container' key={i}>
                <img onClick={showPhotoModal} className='photo-thumb' src={photoUrl}/>
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