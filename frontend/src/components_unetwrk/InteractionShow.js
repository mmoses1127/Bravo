import { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/session";
import { createInteraction, deleteInteraction } from "../store/interactions";
import { useDispatch } from "react-redux";
import Collapsible from 'react-collapsible';
import { Modal } from "../context/Modal";
import InteractionDelete from "./InteractionDelete";
import './Collapsible.css';


const emptyInteraction = {
  dateContacted: new Date(),
  contactMethod: "",
  notes: "",
  nextContactDate: new Date()
}

const InteractionShow = ({interaction = emptyInteraction, setShowNewInteraction, contact, startOpen = false}) => {

  console.log('startOpen', startOpen);

  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const [dateContacted, setDateContacted] = useState(interaction.dateContacted.toString().slice(0, 10));
  const [contactMethod, setContactMethod] = useState(interaction.contactMethod);
  const [notes, setNotes] = useState(interaction.notes);
  const [contactDate, setContactDate] = useState(interaction.contactDate);
  const [nextContactDate, setNextContactDate] = useState(interaction.nextContactDate.toString().slice(0, 10));
  const [showInteractionDelete, setShowInteractionDelete] = useState(false);

  const validatePayload = (payload) => {
    let errors = [];
    if (payload.date_contacted.length < 1) errors.push("Date contacted cannot be empty.");
    return errors;
  }

  const handleCreateInteraction = () => {
    console.log('create interaction');

    const newInteraction = {
      date_contacted: dateContacted,
      contact_method: contactMethod,
      notes,
      contact_date: contactDate,
      next_contact_date: nextContactDate,
      contact_id: contact.id,
      user_id: currentUser.id
    }

    if (validatePayload(newInteraction).length > 0) {
      alert('Please fill out all required fields.');
      return;
    } else {
      dispatch(createInteraction(newInteraction));
      setShowNewInteraction(false);
    }
  }

  // const handleDelete = () => {
  //   console.log('delete interaction');
  //   dispatch(deleteInteraction(interaction.id));
  // }


    const triggerText = "CLICK TO COLLAPSE"
  

  return (

    <Collapsible trigger={triggerText} open={startOpen}>
      <div className="flex flex-col items-start bg-background-secondary p-2 mb-5">
        <div className="flex flex-row mb-3 justify-between w-full">
          <div className="flex flex-col w-1/4">
            <label className="" htmlFor="nextContactDate">Contact Date
              <input className='drop-shadow bg-white border-none h-8 w-full' type="date" id="nextContactDate" value={dateContacted} onChange={(e) => setDateContacted(e.target.value)} />
            </label>
          </div>
          <div className="flex flex-col w-1/4">
            <label htmlFor="contactMethod">Contact Method
              <input className='drop-shadow bg-white border-none h-8 w-full' type="text" id="contactMethod" value={contactMethod} onChange={(e) => setContactMethod(e.target.value)} />
            </label>
          </div>
          <div className="flex flex-col w-1/3">
            <label htmlFor="nextContactDate">Next Contact Date </label>
            <input className='drop-shadow bg-white border-none h-8' type="date" id="nextContactDate" value={nextContactDate} onChange={(e) => setNextContactDate(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-col w-full mb-3">
          <label htmlFor="notes">Notes
            <textarea className='drop-shadow bg-white border-none h-40 w-full text-left resize-none' type="textarea" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
          <p className="text-right w-full">{notes.length} / 500</p>
        </div>
        <div className="flex flex-row justify-between w-full items-end">
          <button onClick={e => setShowInteractionDelete(true)} className="flex flex-row justify-between h-8">
            <i className="fa-solid fa-trash-can text-md mr-2"></i>
            Delete Interaction
          </button>
        </div>
        <div className="flex flex-row w-full">
        {/* <i onClick={handleCreateInteraction} className="fas fa-caret-up"></i> */}
        </div>
      </div>
      {showInteractionDelete && <Modal children={<InteractionDelete interaction={interaction} setShowInteractionDelete={setShowInteractionDelete} />} />}
    </Collapsible>

  )

}

export default InteractionShow;