import { useDispatch } from "react-redux";
import { deleteContact } from "../store/contacts";


const ContactDelete = ({contactId, setShowDeleteModal}) => {

  const dispatch = useDispatch();

  const handleDeleteContact = e => {
    e.preventDefault();  
    dispatch(deleteContact(contactId));
    setShowDeleteModal(false);
  }

  return (

    <div className="flex flex-col justify-start bg-slate-200 p-5 h-full min-w-[500px]">
      <p className="text-3xl pr-20">Delete Contact?</p>
      <p>All contact information will be lost.</p>
      <div className="flex flex-row justify-end">
        <button className="m-3" onClick={e => setShowDeleteModal(false)}>Cancel</button>
        <button className="m-3" onClick={handleDeleteContact}>Delete Contact</button>
      </div>
    </div>

  )

}

export default ContactDelete;