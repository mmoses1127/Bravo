import { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../store/contacts";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/session";


const NewContact = ({setShowAddContact, column, setContact, setShowContactShow}) => {

  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");

  const validatePayload = (payload) => {
    let errors = [];
    if (payload.first_name.length < 1) errors.push("First name cannot be empty.");
    if (payload.last_name.length < 1) errors.push("Last name cannot be empty.");
    if (payload.company.length < 1) errors.push("Company cannot be empty.");
    return errors;
  }

  const handleClick = async e => {
    e.preventDefault();
    const newContact = await handleAddContact(e);
    setContact(newContact);
    setShowAddContact(false);
    setShowContactShow(true);
  }

  const handleAddContact = async e => {
    e.preventDefault();
    const payload = {
      user_id: currentUser.id,
      first_name: firstName,
      last_name: lastName,
      company,
      title,
      column_order: column
    }
    
    const errors = validatePayload(payload);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    } else {
      const newContact = dispatch(createContact(payload));
      return newContact;
    }
  }

  return (

    <div className="flex flex-col justify-even w-full bg-slate-200 p-5 h-full min-w-[700px]">
      <h1>Add Contact</h1>
      <form className="flex flex-row items-center align-center w-full bg-slate-200 p-5 h-full">
        <div className="flex flex-col w-1/2 p-5">
          <label htmlFor="firstName">First Name</label>
          <input onChange={e => setFirstName(e.target.value)} id="firstName" className="drop-shadow bg-white border-none h-8 mb-5" type="text" value={firstName}/>
          <label>Last Name</label>
          <input onChange={e => setLastName(e.target.value)} className="drop-shadow bg-white border-none h-8 mb-5" type="text" value={lastName}/>
          <label>Company</label>
          <input onChange={e => setCompany(e.target.value)} className="drop-shadow bg-white border-none h-8" type="text" value={company}/>
        </div>
        <div className="flex flex-col w-1/2 p-5">
          <label>Title</label>
          <input onChange={e => setTitle(e.target.value)} className="drop-shadow bg-white border-none h-8 mb-5" type="text" value={title}/>
          <label>LinkedIn Profile URL</label>
          <input onChange={e => setLinkedInUrl(e.target.value)} className="drop-shadow bg-white border-none h-8" type="text" calue={linkedInUrl}/>
          <div className="flex flex-row justify-evenly m-5">
            <button onClick={e => setShowAddContact(false)}>Cancel</button>
            <button onClick={handleClick}>Save Contact</button>
          </div>
        </div>
      </form>
    </div>

  )


}

export default NewContact;