import React, { useState } from 'react';
import { createContact, updateContact } from '../store/contacts';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../store/session';

const blankContact = {
  name:  "",
  company: "",
  title: "",
  connectionDescription: "",
  dateConnected: "",
  email: "",
  phoneNumber: "",
  userId: "",
  columnOrder: 0
}

const ContactUpdate = ({ contact = blankContact, setShowContactShow, columnOrder = 0}) => {

  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [name, setName] = useState(contact.name);
  const [company, setCompany] = useState(contact.company);
  const [title, setTitle] = useState(contact.title);
  const [connectionDescription, setConnectionDescription] = useState(contact.connectionDescription);
  const [dateConnected, setDateConnected] = useState(contact.dateConnected);
  const [email, setEmail] = useState(contact.email);
  const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);
  const [linkedInUrl, setLinkedInUrl] = useState(contact.linkedIn);

  const validatePayload = (payload) => {
    let errors = [];
    if (payload.name.length < 1) errors.push("Name cannot be empty.");
    return errors;
  }

  const handleAddContact = (e) => {
    e.preventDefault();
    console.log('submitted!')
    const payload = {
      name: name,
      company,
      title,
      connection_description: connectionDescription,
      date_connected: dateConnected,
      email,
      phone_number: phoneNumber,
      user_id: currentUser.id,
      column_order: columnOrder
    }
    
    const errors = validatePayload(payload);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    } else {
      contact.id ? dispatch(updateContact({...payload, id: contact.id})) : dispatch(createContact(payload));
      setShowContactShow(false);
    }
  }

  return (
    <form className='flex flex-col justify-between w-full p-5 items-end'>
      <div className='flex flex-row justify-between w-full p-5'>
        <div className='flex flex-col w-1/2 p-3'>
          <label htmlFor="name">Name</label>
          <input className='drop-shadow bg-white border-none h-8' type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="company">Company</label>
          <input className='drop-shadow bg-white border-none h-8' type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input className='drop-shadow bg-white border-none h-8' type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <label htmlFor="connectionDescription">Connection Description</label>
          <input className='drop-shadow bg-white border-none h-8' type="text" value={connectionDescription} onChange={(e) => setConnectionDescription(e.target.value)} />
        </div>
        <div className='flex flex-col  w-1/2 p-3'>
          <label htmlFor="title">Title</label>
          <input className='drop-shadow bg-white border-none h-8' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="email">LinkedIn Profile URL</label>
          <input className='drop-shadow bg-white border-none h-8' type="text" value={linkedInUrl} onChange={(e) => setLinkedInUrl(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input className='drop-shadow bg-white border-none h-8' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="dateConnected">Date Connected</label>
          <input className='drop-shadow bg-white border-none h-8' type="date" value={dateConnected} onChange={(e) => setDateConnected(e.target.value)} />
        </div>
      </div>
      <div className='flex flex-col'>
      <button className='rounded bg-brand-primary text-white p-2 w-full' onClick={handleAddContact}>Save Contact Information</button>
      </div>
    </form>
  );

}

export default ContactUpdate;