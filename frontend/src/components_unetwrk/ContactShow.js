import React, { useState } from 'react';

const ContactShow = ({ contact }) => {

  if (!contact) {
    contact = {
      firstName: "",
      lastName: "",
      company: "",
      title: "",
      connectionDescription: "",
      dateConnected: "",
      email: "",
      phoneNumber: ""
    }
  }

  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [company, setCompany] = useState(contact.company);
  const [title, setTitle] = useState(contact.title);
  const [connectionDescription, setConnectionDescription] = useState(contact.connectionDescription);
  const [dateConnected, setDateConnected] = useState(contact.dateConnected);
  const [email, setEmail] = useState(contact.email);
  const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);

  const handleAddContact = (e) => {
    e.preventDefault();
    const payload = {
      firstName,
      lastName,
      company,
      title,
      connectionDescription,
      dateConnected,
      email,
      phoneNumber
    }
    console.log(payload);
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

export default ContactShow;