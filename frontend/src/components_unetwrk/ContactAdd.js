import React, { useState } from 'react';
import { createContact, updateContact } from '../store/contacts';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../store/session';

const ContactAdd = ({ contact }) => {

  if (!contact) {
    contact = {
      firstName: "",
      lastName: "",
      company: "",
      title: "",
      connectionDescription: "",
      dateConnected: "",
      email: "",
      phoneNumber: "",
      userId: ""
    }
  }

  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [company, setCompany] = useState(contact.company);
  const [title, setTitle] = useState(contact.title);
  const [connectionDescription, setConnectionDescription] = useState(contact.connectionDescription);
  const [dateConnected, setDateConnected] = useState(contact.dateConnected);
  const [email, setEmail] = useState(contact.email);
  const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);

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
    }
    
    const errors = validatePayload(payload);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    } else {
      contact.id ? dispatch(updateContact({...payload, id: contact.id})) : dispatch(createContact(payload));
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

export default ContactAdd;