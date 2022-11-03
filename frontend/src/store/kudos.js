import csrfFetch from "./csrf";


export const ADD_ALL_KUDOS = 'ADD_ALL_KUDOS';
export const ADD_KUDO = 'ADD_KUDO';
export const REMOVE_KUDO = 'REMOVE_KUDO';

const addAllKudos = (kudos) => {
  return ({
    type: ADD_ALL_KUDOS,
    kudos
  });
};

const addKudo = (kudo) => {
  return ({
    type: ADD_KUDO,
    kudo
  });
};

const removeKudo = (kudoId) => {
  return ({
    type: REMOVE_KUDO,
    kudoId
  });
};

export const getKudos = (state = {}) => {
  if (!state.kudos) return [];
  return state.kudos;
};

export const fetchKudos = () => async dispatch => {
  const res = await fetch(`api/kudos`);

  if (res.ok) {
    const kudos = await res.json();
    dispatch(addAllKudos());
  };
};

export const createKudo = (kudo) => async dispatch => {
  const res = await csrfFetch(`api/kudos`, {
    method: 'POST',
    headers: {'Content-Typee': 'application/json'},
    body: JSON.stringify(kudo)
  });

  if (res.ok) {
    const newKudo = await res.json();
    dispatch(addKudo(newKudo))
  }
};

export const deleteKudo = (kudoId) => async dispatch => {
  const res = await csrfFetch(`api/kudos/${kudoId}`);

  if (res.ok) {
    dispatch(removeKudo(kudoId));
  }
};

const kudosReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ALL_KUDOS:
      return action.kudos;
    case ADD_KUDO:
      return {...state, [action.kudo.id]: action.kudo};
    case REMOVE_KUDO:
      let newState = {...state};
      delete newState[action.kudoId];
      return newState;
    default:
      return state;
  }
};

export default kudosReducer;
