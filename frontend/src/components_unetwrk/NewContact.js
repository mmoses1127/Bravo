import { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../store/contacts";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/session";


const NewContact = ({setShowAddContact, column, setContact, setShowContactShow}) => {

  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");

  const validatePayload = (payload) => {
    let errors = [];
    if (payload.name.length < 1) errors.push("Name cannot be empty.");
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
      name,
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
          <label htmlFor="name">Name</label>
          <input onChange={e => setName(e.target.value)} id="name" className="drop-shadow bg-white border-none h-8 mb-5" type="text" value={name}/>
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