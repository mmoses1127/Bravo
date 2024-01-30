import ContactShow from "./ContactShow";
import { useEffect, useState } from "react";
import { Modal } from "../context/Modal";

const ContactCard = ({contact}) => {

  const [showAddContact, setShowAddContact] = useState(false);

  const handleContactShow = (e) => {
    e.preventDefault();
    setShowAddContact(true);
  }

  const handleCloseModal = (e) => {
    console.log('close modal')
    // e.preventDefault();
    setShowAddContact(false);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    if(e && e.stopPropagation) e.stopPropagation();
    console.log('delete');
  }

  // console.log('showmodal', showModal)

  return (

    <div className="flex flex-col rounded-lg w-full bg-white p-3 mb-5 cursor-pointer" onClick={e => setShowAddContact(true)}>
      <div className="flex flex-row justify-between">
      <i className="fa-regular fa-user text-xl"></i>
      <i className="fa-solid fa-link text-xl"></i>
      </div>
      <p>{contact.firstName} {contact.lastName}</p>
      <p>{contact.company}</p>
      <div className="flex flex-row justify-between">
        <p>{contact.title}</p>
        <i className="fa-solid fa-trash-can text-xl" onClick={handleDelete}></i>
      </div>
      {showAddContact && <Modal children={<ContactShow setShowAddContact={setShowAddContact} contact={contact}/>}/>}
    </div>

  )

}

export default ContactCard;