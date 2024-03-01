import { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../store/contacts";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/session";
import {checkErrors} from "./Utils"; 


const NewContact = ({setShowAddContact, column, setContact, setShowContactShow, setShowDeleteModal}) => {


  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [errors, setErrors] = useState([]);

  const validatePayload = (payload) => {
    setErrors([]);
    if (payload.name.length < 1) errors.push("Name cannot be empty.");
    return errors;
  }

  const handleClick = async e => {
    e.preventDefault();
    const newContact = await handleAddContact(e);
    if (newContact && !errors.length) {
      setContact(newContact);
      setShowAddContact(false);
      setShowContactShow(true);
    }
  }

  const handleAddContact = async e => {
    e.preventDefault();
    const payload = {
      user_id: currentUser.id,
      name,
      company,
      title,
      linked_in: linkedIn,
      column_order: column,
      connection_description: '',
      date_connected: '',
      email: '',
      phone_number: '',
    }

    
    const errors = validatePayload(payload);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    } else {
      const newContact = await dispatch(createContact(payload))
      .catch(async (res) => checkErrors(res, setErrors));
      return newContact;
    }
  }

  const handleCancel = e => {
    e.preventDefault();
    setShowDeleteModal(true);
  }

  return (

    <div className="flex flex-col justify-even w-full bg-slate-200 p-5 h-full min-w-[700px]">
      <h1 className="text-xl font-semibold">Add Contact</h1>
      <p className="text-xs italic">*required</p>
      {<ul className='mb-3'>
        {errors.map(error => <li className="text-error-red font-bold" key={error.message}>{error.message}</li>)}
      </ul>}
      <form className="flex flex-col items-center align-center w-full bg-slate-200 p-5 h-full">
        <div className="flex flex-row w-full p-5 justify-evenly">
          <div className="flex flex-col">
            <label htmlFor="name">*Name</label>
            <input onChange={e => setName(e.target.value)} id="name" className="drop-shadow bg-white border-none h-8 mb-5" type="text" value={name}/>
          </div>
          <div className="flex flex-col">
            <label>Title</label>
            <input onChange={e => setTitle(e.target.value)} className="drop-shadow bg-white border-none h-8 mb-5" type="text" value={title}/>
          </div>
        </div>
        <div className="flex flex-row w-full p-5 justify-evenly">
          <div className="flex flex-col">
            <label>Company</label>
            <input onChange={e => setCompany(e.target.value)} className="drop-shadow bg-white border-none h-8" type="text" value={company}/>
          </div>  
          <div className="flex flex-col">        
            <label>LinkedIn Profile URL</label>
            <input onChange={e => setLinkedIn(e.target.value)} className="drop-shadow bg-white border-none h-8" type="text" calue={linkedIn}/>
          </div>
        </div>
        <div className="flex flex-row justify-end w-full m-5">
          <button className="rounded border-brand-primary border-2 text-brand-primary p-2 mr-3" onClick={handleCancel}>Cancel</button>
          <button className=" p-2 rounded text-white bg-brand-primary p-2 disabled:bg-pale-green disabled:cursor-not-allowed" disabled={!name.length} onClick={handleClick}>Save Contact</button>
        </div>
      </form>
    </div>

  )


}

export default NewContact;