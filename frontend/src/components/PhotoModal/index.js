import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import './Modal.css'

function PhotoModal({ride, closeModal}) {
  const [showModal, setShowModal] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);

  const switchPreviousPhoto = () => {
    setPhotoIndex((Math.abs(photoIndex - 1)) % ride.photoUrls.length)
  };

  const switchNextPhoto = () => {
    setPhotoIndex((photoIndex + 1) % ride.photoUrls.length)
  }

  if (!ride) return null;


  return (
    <>
      {showModal && (
        <Modal onClose={(e) => closeModal(e)}>
          <div className='photo-modal-box'>
            <button onClick={() => switchPreviousPhoto()} className='next-button left-button'><i className="fa-solid fa-chevron-left"/></button>
            <img className='photo-in-modal' src={ride.photoUrls[photoIndex]} alt='Ride' />
            <button onClick={() => switchNextPhoto()} className='next-button'><i className="fa-solid fa-chevron-right"/></button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default PhotoModal;