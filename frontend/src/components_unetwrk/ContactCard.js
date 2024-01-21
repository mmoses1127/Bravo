import ContactShow from "./ContactShow";
import { useState } from "react";
import { Modal } from "../context/Modal";

const ContactCard = ({contact}) => {

  const [showModal, setShowModal] = useState(false);

  const handleContactShow = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  const handleCloseModal = (e) => {
    e.preventDefault();
    console.log('yeeeee');
    setShowModal(false);
  }

  return (

    <div className="flex flex-col rounded-lg w-full bg-white p-3 mb-5 cursor-pointer" onClick={handleContactShow}>
      <div className="flex flex-row justify-between">
      <i className="fa-regular fa-user text-xl"></i>
      <i className="fa-solid fa-link text-xl"></i>
      </div>
      <p>{contact.firstName} {contact.lastName}</p>
      <p>{contact.title}</p>
      <p>{contact.company}</p>
      {showModal && (
        <Modal children={<ContactShow onClose={handleCloseModal} contact={contact}/>}/>
      )}
    </div>

  )

}

export default ContactCard;