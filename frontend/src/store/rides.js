import csrfFetch from './csrf.js';
import { Redirect } from 'react-router-dom';

export const ADD_RIDES = `ADD_RIDES`;
export const ADD_RIDE = `ADD_RIDE`;
export const REMOVE_RIDE = `REMOVE_RIDE`;

const addRides = (rides) => {
  return ({
    type: ADD_RIDES,
    rides
  });
};

const addRide = (ride) => {
  return ({
    type: ADD_RIDE,
    ride
  });
};

const removeRide = (rideId) => {
  return ({
    type: REMOVE_RIDE,
    rideId
  });
};

export const getRides = (state) => {
  if (!state.rides) return [];
  return Object.values(state.rides);
};

export const getRide = rideId => (state) => {
  if (!state.rides) return null;
  return state.rides[rideId];
}

export const getMyRides = (state) => {
  if (!state.rides) return [];
  return Object.values(state.rides);
}

export const fetchRides = () => async dispatch => {
  const res = await fetch(`/api/rides`);

  if (res.ok) {
    const rides = await res.json();
    dispatch(addRides(rides))
  };
};

export const fetchMyRides = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}/rides`);

  if (res.ok) {
    const rides = await res.json();
    dispatch(addRides(rides))
  };
};

export const fetchRide = (rideId) => async dispatch => {
  const res = await csrfFetch(`/api/rides/${rideId}`);

  if (res.ok) {
    const ride = await res.json();
    dispatch(addRide(ride))
  };
};

export const deleteRide = (rideId) => async dispatch => {
  const res = await csrfFetch(`/api/rides/${rideId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeRide(rideId))
  };
};

export const createRide = (ride) => async dispatch => {
  const res = await csrfFetch(`/api/rides`, {
    method: 'POST',
    body: JSON.stringify(ride)
  });

  if (res.ok) {
    const newRide = await res.json();
    dispatch(addRide(newRide));
    return newRide;
  };
};

export const updateRide = (ride) => async dispatch => {
  const res = await csrfFetch(`/api/rides/${ride.id}`, {
    method: 'PATCH',
    body: JSON.stringify(ride)
  });

  if (res.ok) {
    const updatedRide = await res.json();
    dispatch(addRide(updatedRide));
  };
};

const ridesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_RIDES:
      return action.rides;
    case ADD_RIDE:
      return {...state, [action.ride.id]: action.ride};
    case REMOVE_RIDE:
      let newState = {...state};
      delete newState[action.rideId]  ;
      return newState;
    default:
      return state;
  }
}


export default ridesReducer;