import { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/session";
import { createInteraction, deleteInteraction, updateInteraction } from "../store/interactions";
import { useDispatch } from "react-redux";
import Collapsible from 'react-collapsible';
import { Modal } from "../context/Modal";
import InteractionDelete from "./InteractionDelete";
import './Collapsible.css';


const emptyInteraction = {
  dateContacted: "",
  contactMethod: "",
  notes: "",
  nextContactDate: ""
}

const InteractionShow = ({interaction = emptyInteraction, setShowNewInteraction, contact, startOpen = false}) => {

  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const [dateContacted, setDateContacted] = useState(interaction.dateContacted ? interaction.dateContacted.toString().slice(0, 10) : '');
  const [contactMethod, setContactMethod] = useState(interaction.contactMethod ? interaction.contactMethod : '');
  const [notes, setNotes] = useState(interaction.notes ? interaction.notes : '');
  const [nextContactDate, setNextContactDate] = useState(interaction.nextContactDate ? interaction.nextContactDate.toString().slice(0, 10) : '');
  const [showInteractionDelete, setShowInteractionDelete] = useState(false);
  const triggerText = "CLICK TO COLLAPSE"

  const validatePayload = () => {
    return (dateContacted.length > 0) || (contactMethod.length > 0) || (notes.length > 0) || (nextContactDate.length > 0) 
  }

  const handleCreateInteraction = () => {

    const newInteraction = {
      date_contacted: dateContacted,
      contact_method: contactMethod,
      notes,
      next_contact_date: nextContactDate,
      contact_id: contact.id,
      user_id: currentUser.id
    }

    interaction.id ? dispatch(updateInteraction({...newInteraction, id: interaction.id})) : dispatch(createInteraction(newInteraction));
    setShowNewInteraction(false);
    }
  
  

  return (

    <Collapsible trigger={triggerText} open={startOpen}>
      <div className="flex flex-col items-start bg-background-secondary p-2 mb-5 w-full">
        <p className="italic mb-3">*Contact date and contact method required to save interaction to your timeline.</p>
        <div className="flex flex-row mb-3 justify-between w-full">
          <div className="flex flex-col w-1/4">
            <label className="" htmlFor="nextContactDate">*Contact Date
              <input className='drop-shadow bg-white border-none h-8 w-full' type="date" id="nextContactDate" value={dateContacted} onChange={(e) => setDateContacted(e.target.value)} />
            </label>
          </div>
          <div className="flex flex-col w-1/4">
            <label htmlFor="contactMethod">*Contact Method
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
          <button onClick={e => setShowInteractionDelete(true)} className="flex flex-row justify-between bg-white border-brand-primary border-2 rounded p-3 h-12">
            <i className="fa-solid fa-trash-can text-md mr-2"></i>
            Delete Interaction
          </button>
          <button onClick={handleCreateInteraction} disabled={!validatePayload()} className="h-12 bg-brand-primary rounded p-2 text-white px-5 disabled:cursor-not-allowed disabled:bg-background-disabled">Save Notes</button>
        </div>
        <div className="flex flex-row w-full">
        {/* <i onClick={handleCreateInteraction} className="fas fa-caret-up"></i> */}
        </div>
      </div>
      {showInteractionDelete && <Modal children={<InteractionDelete interaction={interaction} setShowNewInteraction={setShowNewInteraction} setShowInteractionDelete={setShowInteractionDelete} />} />}
    </Collapsible>

  )

}

export default InteractionShow;