import csrfFetch from "./csrf";


export const ADD_ALL_INTERACTIONS = 'ADD_ALL_INTERACTIONS';
export const ADD_INTERACTION = 'ADD_INTERACTION';
export const REMOVE_INTERACTION = 'REMOVE_INTERACTION';

const addAllInteractions = (interactions) => ({
  type: ADD_ALL_INTERACTIONS,
  interactions
});

const addInteraction = (interaction) => ({
  type: ADD_INTERACTION,
  interaction
});

const removeInteraction = (interactionId) => ({
  type: REMOVE_INTERACTION,
  interactionId
});


export const getInteractions = (state = {}) => {
  if (!state.interactions) return [];
  return Object.values(state.interactions);
};

export const getContactInteractions = (contactId) => (state = {}) => {
  if (!state.interactions) return [];
  return Object.values(state.interactions).filter(interaction => {
    return interaction.contactId === contactId;
  });
};

export const fetchInteractions = () => async dispatch => {
  const res = await fetch(`/api/interactions`);

  if (res.ok) {
    const interactions = await res.json();
    dispatch(addAllInteractions(interactions));
  };
};

export const createInteraction = (interaction) => async dispatch => {
  console.log(interaction);
  const res = await csrfFetch(`/api/interactions`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(interaction)
  });

  if (res.ok) {
    const newinteraction = await res.json();
    dispatch(addInteraction(newinteraction));
  };
};

export const deleteInteraction = (interactionId) => async dispatch => {
  const res = await csrfFetch(`/api/interactions/${interactionId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeInteraction(interactionId));
  };
};

export const updateInteraction = (interaction) => async dispatch => {
  const res = await csrfFetch(`/api/interactions/${interaction.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(interaction)
  });

  if (res.ok) {
    const updatedinteraction = await res.json();
    dispatch(addInteraction(updatedinteraction));
  };
};

const interactionsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ALL_INTERACTIONS:
      return action.interactions;
    case ADD_INTERACTION:
      return {...state, [action.interaction.id]: action.interaction};
    case REMOVE_INTERACTION:
      let newState = {...state};
      delete newState[action.interactionId]
      return newState;
    default:
      return state;
  }
};

export default interactionsReducer;