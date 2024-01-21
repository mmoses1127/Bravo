import { fetchContacts, getContacts } from "../store/contacts";
import ContactColumn from "./ContactColumn";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../store/session";
import { Redirect } from "react-router-dom";

const KanbanBoard = () => {

  const tiers = [0,1,2,3]

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    if (!contacts.length) dispatch(fetchContacts());
  }, [dispatch]);

  if (!currentUser) {
    return (
      <Redirect to="/"/>
    )
  };

  return (
    <div className="flex flex-row w-full justify-between">
      {tiers.map((tier) => (
        <ContactColumn key={tier} tier={tier} contacts={contacts}/>
      ))}
    </div>
  )

}

export default KanbanBoard;