import { useDispatch } from "react-redux";
import { deleteContact } from "../store/contacts";


const ContactDelete = ({contactId, setShowDeleteModal, setShowAddContact, setStopPropagation}) => {

  const dispatch = useDispatch();

  const handleDeleteContact = e => {
    e.preventDefault();  
    if (contactId) dispatch(deleteContact(contactId));
    setShowDeleteModal(false);
    setShowAddContact(false);
    if (setStopPropagation) setStopPropagation(false);
  }

  const handleCancel = e => {
    e.preventDefault();
    setShowDeleteModal(false);
    if (setStopPropagation) setStopPropagation(false);
  }

  return (

    <div className="flex flex-col justify-start bg-slate-200 p-5 h-full min-w-[500px] rounded border-2 border-brand-primary">
      <p className="text-3xl pr-20">Discard Contact?</p>
      <p>All contact information will be lost.</p>
      <div className="flex flex-row justify-end">
        <button className="rounded border-brand-primary border-2 p-2 m-3" onClick={handleCancel}>Cancel</button>
        <button className="rounded bg-brand-primary text-white p-2 m-3" onClick={handleDeleteContact}>Discard Contact</button>
      </div>
    </div>

  )

}

export default ContactDelete;