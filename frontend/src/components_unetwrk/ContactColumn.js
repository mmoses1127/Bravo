import { getContacts } from "../store/contacts";
import ContactCard from "./ContactCard";

const ContactColumn = ({tier, contacts}) => {

  const tierName = "Tier Name";
  const tierContacts = contacts.filter(contact => contact.columnOrder === tier);

  return (

    <div className="flex flex-col w-1/5 bg-emerald-100">
      <div className="flex flex-col bg-emerald-800 p-5 rounded">
        <div className="flex flex-row justify-between">
          <h3>{tierName}</h3>
          <i className="fa-solid fa-pencil"></i>
        </div>
        <p>{tierContacts.length} contacts</p>
      </div>
      <button className="bg-emerald-500 mt-5 mb-5 b-0">+ Add contact</button>

      {tierContacts.length && tierContacts.map(contact => (
        <ContactCard key={contact.id} contact={contact}/>
      ))
      }
    </div>

  )

}

export default ContactColumn;