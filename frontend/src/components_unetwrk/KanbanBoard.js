import { fetchContacts, getContacts, updateContact } from "../store/contacts";
import ContactColumn from "./ContactColumn";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../store/session";
import { Redirect } from "react-router-dom";
import { fetchUserTiers, getUserTiers } from "../store/tiers";
import { DragDropContext } from "react-beautiful-dnd";

const KanbanBoard = () => {

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const currentUser = useSelector(getCurrentUser);
  const tiers = useSelector(getUserTiers(currentUser.id));

  const onDragEnd = (result) => {
    
    let draggedContact = contacts.find(contact => contact.id === parseInt(result.draggableId));
    const newTierId = parseInt(result.destination.droppableId);
    const newTier = tiers.find(tier => tier.id === newTierId);
    const newColumnOrder = newTier.position;
    
    console.log(newTier);

    if (draggedContact.columnOrder !== newColumnOrder) {
      draggedContact.column_order = newColumnOrder;
      console.log("draggedContact", draggedContact)
      dispatch(updateContact(draggedContact));
    }
    
    console.log(result);
    console.log(draggedContact);
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
      <div className="flex flex-row w-full justify-between">
        {tiers.map((tier, index) => (
          <ContactColumn key={tier.id} tier={tier} contacts={contacts}/>
        ))}
      </div>
    </DragDropContext>
  )

}

export default KanbanBoard;