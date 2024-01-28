import { fetchContacts, getContacts } from "../store/contacts";
import ContactColumn from "./ContactColumn";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../store/session";
import { Redirect } from "react-router-dom";
import { fetchTiers, getUserTiers } from "../store/tiers";

const KanbanBoard = () => {

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const currentUser = useSelector(getCurrentUser);
  const tiers = useSelector(getUserTiers(currentUser.id));

  useEffect(() => {
    if (!contacts.length) dispatch(fetchContacts());
    if (!tiers.length) dispatch(fetchTiers());
  }, [dispatch]);

  if (!currentUser) {
    return (
      <Redirect to="/"/>
    )
  };

  return (
    <div className="flex flex-row w-full justify-between">
      {tiers.map((tier) => (
        <ContactColumn key={tier.id} tier={tier} contacts={contacts}/>
      ))}
    </div>
  )

}

export default KanbanBoard;