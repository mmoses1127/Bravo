import { fetchContacts, getContacts, updateContact } from "../store/contacts";
import ContactColumn from "./ContactColumn";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../store/session";
import { Redirect } from "react-router-dom";
import { fetchUserTiers, getUserTiers } from "../store/tiers";
import { DragDropContext } from "react-beautiful-dnd";

const KanbanBoard = ({filterText}) => {

  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const tiers = useSelector(getUserTiers(currentUser.id));
  const contacts = useSelector(getContacts);
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    if (contacts && contacts.length) {
      let filteredCons = contacts.filter(contact => contact.name.toLowerCase().includes(filterText.toLowerCase()) || contact.company.toLowerCase().includes(filterText.toLowerCase()) || contact.title.toLowerCase().includes(filterText.toLowerCase()));
      setFilteredContacts(filterText.length ? filteredCons : contacts);
    }
  }, [filterText, contacts])


  

  const onDragEnd = (result) => {
    
    let draggedContact = contacts.find(contact => contact.id === parseInt(result.draggableId));
    const newTierId = parseInt(result.destination.droppableId);
    const newTier = tiers.find(tier => tier.id === newTierId);
    const newColumnOrder = newTier.position;
    
    if (draggedContact.columnOrder !== newColumnOrder) {
      draggedContact.column_order = newColumnOrder;
      console.log("draggedContact", draggedContact)
      dispatch(updateContact(draggedContact));
    }
  }

  useEffect(() => {
    if (!contacts.length) dispatch(fetchContacts());
    if (!tiers.length) dispatch(fetchUserTiers(currentUser.id));
  }, [dispatch]);

  if (!currentUser) {
    return (
      <Redirect to="/"/>
    )
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-row w-full justify-between border-solid border-4 border-brand-primary min-h-screen">
        {tiers.map( tier => (
          <ContactColumn key={tier.id} tier={tier} contacts={filteredContacts}/>
        ))}
      </div>
    </DragDropContext>
  )

}

export default KanbanBoard;