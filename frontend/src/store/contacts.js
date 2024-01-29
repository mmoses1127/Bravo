import csrfFetch from "./csrf";


export const ADD_ALL_CONTACTS = 'ADD_ALL_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

const addAllContacts = (contacts) => ({
  type: ADD_ALL_CONTACTS,
  contacts
});

const addContact = (contact) => ({
  type: ADD_CONTACT,
  contact
});

const removeContact = (contactId) => ({
  type: REMOVE_CONTACT,
  contactId
});


export const getContacts = (state = {}) => {
  if (!state.contacts) return [];
  return Object.values(state.contacts);
};

// export const getUserContacts = (userId) => (state = {}) => {
//   if (!state.contacts) return [];
//   return Object.values(state.contacts).filter(contact => {
//     return contact.userId === userId;
//   });
// };

export const fetchContacts = () => async dispatch => {
  const res = await fetch(`/api/contacts`);

  if (res.ok) {
    const contacts = await res.json();
    dispatch(addAllContacts(contacts));
  };
};

export const createContact = (contact) => async dispatch => {
  console.log(contact);
  const res = await csrfFetch(`/api/contacts`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(contact)
  });

  if (res.ok) {
    const newContact = await res.json();
    dispatch(addContact(newContact));
  };
};

export const deleteContact = (contactId) => async dispatch => {
  const res = await csrfFetch(`/api/contacts/${contactId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeContact(contactId));
  };
};

export const updateContact = (contact) => async dispatch => {
  const res = await csrfFetch(`/api/contacts/${contact.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(contact)
  });

  if (res.ok) {
    const updatedContact = await res.json();
    console.log('updatedContact', updatedContact)
    dispatch(addContact(updatedContact));
  };
};

const contactsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ALL_CONTACTS:
      return action.contacts;
    case ADD_CONTACT:
      return {...state, [action.contact.id]: action.contact};
    case REMOVE_CONTACT:
      let newState = {...state};
      delete newState[action.contactId]
      return newState;
    default:
      return state;
  }
};

export default contactsReducer;