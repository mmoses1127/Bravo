import ContactShow from "./ContactShow";
import { useEffect, useState } from "react";
import { Modal } from "../context/Modal";
import ContactDelete from "./ContactDelete";
import { Link } from "react-router-dom";

const ContactCard = ({contact, setShowContactShow, showContactShow, setContact}) => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [stopPropagation, setStopPropagation] = useState(false);

  // const handleContactShow = (e) => {
  //   e.preventDefault();
  //   setShowContactShow(true);
  // }

  const handleCloseModal = (e) => {
    e.preventDefault();
    console.log('close modal')
    setShowContactShow(false);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    if(e && e.stopPropagation) {
      e.stopPropagation();
      console.log('stop propagation');
    }
    console.log('delete');
    setShowDeleteModal(true);
    setStopPropagation(true);
  }

  const handleShowContact = (e) => {
    if (!stopPropagation) {
    e.preventDefault();
    console.log('show contact');
    setContact(contact);
    setShowContactShow(true);
    }
  }

  const openInNewTab = (e, url) => {
    e.stopPropagation();
    const fullUrl = url.includes('https://') ? url : 'https://' + url;
    const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null;
  }


  return (

    <div className="flex flex-col rounded-lg w-full bg-white p-3 mb-5 cursor-pointer" onClick={handleShowContact}>
      <div className="flex flex-row justify-between">
      <i className="fa-regular fa-user text-xl"></i>
      {contact.linkedIn && <i onClick={e => openInNewTab(e, contact.linkedIn)} className="fa-solid fa-link text-xl"></i>}
      </div>
      <p>{contact.name}</p>
      <p>{contact.company}</p>
      <div className="flex flex-row justify-between">
        <p>{contact.title}</p>
        <i className="fa-solid fa-trash-can text-xl" onClick={handleDelete}></i>
      </div>
      {showDeleteModal && <Modal children={<ContactDelete setStopPropagation={setStopPropagation} setShowContactShow={setShowContactShow} setShowDeleteModal={setShowDeleteModal} contactId={contact.id}/>}/>}
    </div>

  )

}

export default ContactCard;