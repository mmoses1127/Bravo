import { getContacts } from "../store/contacts";
import ContactCard from "./ContactCard";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateTier } from "../store/tiers";
import ContactShow from "./ContactShow";
import { Modal } from "../context/Modal";

const ContactColumn = ({tier, contacts}) => {


  const dispatch = useDispatch();
  const tierContacts = contacts.filter(contact => contact.columnOrder === tier);

  const [showEditTier, setShowEditTier] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [tierName, setTierName] = useState(tier.name);

  const handleUpdateTierName = (e) => {
    e.preventDefault();
    dispatch(updateTier({id: tier.id, name: tierName}));
    setShowEditTier(false);
  }

  return (

    <div className="flex flex-col w-1/5 bg-emerald-100 p-5">
      <div className="flex flex-col bg-emerald-800 p-5 rounded">
        <div className="flex flex-row justify-between">
          {showEditTier ? 
          <form>
            <input type="text" value={tierName} onChange={e => setTierName(e.target.value)} onBlur={handleUpdateTierName} />  
          </form> 
          :
          <h3>{tier.name}</h3>
          }
          <i className="fa-solid fa-pencil" onClick={e => setShowEditTier(true)}></i>
        </div>
        <p>{tierContacts.length} contacts</p>
      </div>
      <button className="bg-emerald-500 mt-5 mb-5 b-0" onClick={e => setShowAddContact(true)}>+ Add contact</button>

      {tierContacts && tierContacts.map(contact => (
        <ContactCard key={contact.id} contact={contact}/>
      ))
      }

      {showAddContact && <Modal children={<ContactShow/>}/>}
    </div>

  )

}

export default ContactColumn;