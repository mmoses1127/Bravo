import { getContacts } from "../store/contacts";
import ContactCard from "./ContactCard";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateTier } from "../store/tiers";
import ContactShow from "./ContactShow";
import { Modal } from "../context/Modal";
import { Draggable, Droppable } from "react-beautiful-dnd";
import NewContact from "./NewContact";

const ContactColumn = ({tier, contacts}) => {


  const dispatch = useDispatch();
  const tierContacts = contacts.filter(contact => contact.columnOrder === tier.position);

  const [showEditTier, setShowEditTier] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [tierName, setTierName] = useState(tier.name);
  const [ShowContactShow, setShowContactShow] = useState(false);
  const [contact, setContact] = useState({});

  const handleUpdateTierName = (e) => {
    e.preventDefault();
    dispatch(updateTier({...tier, name: tierName}));
    setShowEditTier(false);
  }

  return (

    <div className="flex flex-col w-full bg-emerald-100 p-5">
      <div className="flex flex-col bg-emerald-800 p-5 rounded">
        <div className="flex flex-row justify-between">
          {showEditTier ? 
          <input type="text" value={tierName} onChange={e => setTierName(e.target.value)} onBlur={handleUpdateTierName} />  
          :
          <h3>{tier.name}</h3>
          }
          <i className="fa-solid fa-pencil cursor-pointer" onClick={e => setShowEditTier(true)}></i>
        </div>
        <p>{tierContacts.length} contacts</p>
      </div>
      <button className="bg-emerald-500 mt-5 mb-5 b-0" onClick={e => setShowAddContact(true)}>+ Add contact</button>

      <Droppable droppableId={tier.id.toString()} key={tier.id}>
            {(provided) => (
              <div 
                className="flex flex-col h-full"
                ref={provided.innerRef} 
                {...provided.droppableProps}
              >
                {tierContacts.map((contact, index) => (
                  <Draggable key={contact.id} draggableId={contact.id.toString()} index={index}>
                    {(provided) => (
                      <div 
                      ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps}>
                        <ContactCard contact={contact}/>
                      </div>
                    )}
                  </Draggable>
                ))
                }
                {provided.placeholder}
              </div>
            )}
      </Droppable>

      {showAddContact && <Modal children={<NewContact setShowAddContact={setShowAddContact} column={tier.position} setContact={setContact} setShowContactShow={setShowContactShow}/>}/>}

      {ShowContactShow && <Modal children={<ContactShow setShowContactShow={setShowContactShow} contact={contact}/>}/>}
    </div>

  )

}

export default ContactColumn;