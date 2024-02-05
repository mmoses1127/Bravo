import React, { useState } from 'react';
import { createContact, updateContact } from '../store/contacts';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../store/session';

const ContactUpdate = ({ contact ={}, setShowContactShow, columnOrder = 0}) => {

  const revisedContact = {
    firstName: contact.firstName ? contact.firstName : "",
    lastName: contact.lastName ? contact.lastName : "",
    company: contact.company ? contact.company : "",
    title: contact.title ? contact.title : "",
    connectionDescription: contact.connectionDescription ? contact.connectionDescription : "",
    dateConnected: contact.dateConnected ? contact.dateConnected.slice(0, 10) : "",
    email: contact.email ? contact.email : "",
    phoneNumber: contact.phoneNumber ? contact.phoneNumber : "",
    userId: contact.userId ? contact.userId : "",
    columnOrder: columnOrder,
  }


  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [firstName, setFirstName] = useState(revisedContact.firstName);
  const [lastName, setLastName] = useState(revisedContact.lastName);
  const [company, setCompany] = useState(revisedContact.company);
  const [title, setTitle] = useState(revisedContact.title);
  const [connectionDescription, setConnectionDescription] = useState(revisedContact.connectionDescription);
  const [dateConnected, setDateConnected] = useState(revisedContact.dateConnected);
  const [email, setEmail] = useState(revisedContact.email);
  const [phoneNumber, setPhoneNumber] = useState(revisedContact.phoneNumber);

  const validatePayload = (payload) => {
    let errors = [];
    if (payload.first_name.length < 1) errors.push("First name cannot be empty.");
    if (payload.last_name.length < 1) errors.push("Last name cannot be empty.");
    if (payload.company.length < 1) errors.push("Company cannot be empty.");
    return errors;
  }

  const handleAddContact = (e) => {
    e.preventDefault();
    console.log('submitted!')
    const payload = {
      first_name: firstName,
      last_name: lastName,
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
    <form className='flex flex-row justify-between w-full p-5'>
      <div className='flex flex-col w-1/3'>
        <label htmlFor="firstName">First Name</label>
        <input className='drop-shadow bg-white border-none h-8' type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label htmlFor="lastName">Last Name</label>
        <input className='drop-shadow bg-white border-none h-8' type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <label htmlFor="company">Company</label>
        <input className='drop-shadow bg-white border-none h-8' type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        <label htmlFor="title">Title</label>
        <input className='drop-shadow bg-white border-none h-8' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className='flex flex-col  w-1/3'>
        <label htmlFor="connectionDescription">Connection Description</label>
        <input className='drop-shadow bg-white border-none h-8' type="text" value={connectionDescription} onChange={(e) => setConnectionDescription(e.target.value)} />
        <label htmlFor="dateConnected">Date Connected</label>
        <input className='drop-shadow bg-white border-none h-8' type="date" value={dateConnected} onChange={(e) => setDateConnected(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input className='drop-shadow bg-white border-none h-8' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input className='drop-shadow bg-white border-none h-8' type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div className='flex flex-col'>
        <div className='border-b-5 border-red-400'>
          <h3 className='border-b-5 border-red-400'>Timeline</h3>
          <p>Timeline goes here</p>
        </div>
      <button onClick={handleAddContact}>{contact.id ? `Update Contact` : `Add Contact`}</button>
      </div>
    </form>
  );

}

export default ContactUpdate;