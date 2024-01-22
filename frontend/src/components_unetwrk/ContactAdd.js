import React, { useState } from 'react';
import { createContact } from '../store/contacts';
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
      dispatch(createContact(payload));
    }
  }

  return (
    <form onSubmit={handleAddContact}>
      <label htmlFor="firstName">First Name</label>
      <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <label htmlFor="lastName">Last Name</label>
      <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <label htmlFor="company">Company</label>
      <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
      <label htmlFor="title">Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor="connectionDescription">Connection Description</label>
      <input type="text" value={connectionDescription} onChange={(e) => setConnectionDescription(e.target.value)} />
      <label htmlFor="dateConnected">Date Connected</label>
      <input type="date" value={dateConnected} onChange={(e) => setDateConnected(e.target.value)} />
      <label htmlFor="email">Email</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="phoneNumber">Phone Number</label>
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button>Add Contact</button>
    </form>
  );

}

export default ContactAdd;