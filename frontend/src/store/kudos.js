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
    const kudos = res.json();
    dispatch(addAllKudos());
  };
};

export const createKudo = (kudo) => async dispatch => {
  const res = await csrfFetch(`api/kudos`, {
    method: ''
  });

  if (res.ok) {

  }
};

