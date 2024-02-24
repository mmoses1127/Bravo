import ContactShow from "./ContactShow";
import { useEffect, useState } from "react";
import { Modal } from "../context/Modal";
import ContactDelete from "./ContactDelete";

const ContactCard = ({contact}) => {

  const [showContactShow, setShowContactShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    if(e && e.stopPropagation) e.stopPropagation();
    setShowDeleteModal(true);
    console.log('delete')
  }

  // console.log('showmodal', showModal)

  return (

    <div className="flex flex-col rounded-lg w-full bg-white p-3 mb-5 cursor-pointer" onClick={e => setShowContactShow(true)}>
      <div className="flex flex-row justify-between">
      <i className="fa-regular fa-user text-xl"></i>
      <i className="fa-solid fa-link text-xl"></i>
      </div>
      <p>{contact.name}</p>
      <p>{contact.company}</p>
      <div className="flex flex-row justify-between">
        <p>{contact.title}</p>
        <i className="fa-solid fa-trash-can text-xl" onClick={handleDelete}></i>
      </div>
      {showContactShow && <Modal onClose={handleCloseModal} children={<ContactShow setShowContactShow={handleCloseModal} contact={contact}/>}/>}
      {showDeleteModal && <Modal children={<ContactDelete setShowDeleteModal={setShowDeleteModal} contactId={contact.id}/>}/>}
    </div>

  )

}

export default ContactCard;