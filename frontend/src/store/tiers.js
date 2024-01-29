import csrfFetch from "./csrf";


export const ADD_ALL_TIERS = 'ADD_ALL_TIERS';
export const ADD_TIER = 'ADD_TIER';
export const REMOVE_TIER = 'REMOVE_TIER';

const addAllTiers = (tiers) => ({
  type: ADD_ALL_TIERS,
  tiers
});

const addTier = (tier) => ({
  type: ADD_TIER,
  tier
});

const removeTier = (tierId) => ({
  type: REMOVE_TIER,
  tierId
});


export const getTiers = (state = {}) => {
  if (!state.tiers) return [];
  return Object.values(state.tiers);
};

export const getUserTiers = (userId) => (state = {}) => {
  if (!state.tiers) return [];
  return Object.values(state.tiers).filter(tier => {
    return tier.userId === userId;
  });
};

export const fetchTiers = () => async dispatch => {
  const res = await fetch(`/api/tiers`);

  if (res.ok) {
    const tiers = await res.json();
    dispatch(addAllTiers(tiers));
  };
};

export const fetchUserTiers = (userId) => async dispatch => {
  const res = await fetch(`/api/tiers`);

  if (res.ok) {
    const tiers = await res.json();
    console.log(tiers)
    const tiersArray = Object.values(tiers)
    const userTiers = tiersArray.filter(tier => tier.userId === userId);
    let reducedTiers = {};
    userTiers.forEach(tier => {
      reducedTiers[tier.id] = tier;
    });
    dispatch(addAllTiers(reducedTiers));
  };
};

export const createTier = (tier) => async dispatch => {
  console.log(tier);
  const res = await csrfFetch(`/api/tiers`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(tier)
  });

  if (res.ok) {
    const newtier = await res.json();
    dispatch(addTier(newtier));
  };
};

export const deleteTier = (tierId) => async dispatch => {
  const res = await csrfFetch(`/api/tiers/${tierId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeTier(tierId));
  };
};

export const updateTier = (tier) => async dispatch => {
  const res = await csrfFetch(`/api/tiers/${tier.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(tier)
  });

  if (res.ok) {
    const updatedtier = await res.json();
    dispatch(addTier(updatedtier));
  };
};

const tiersReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ALL_TIERS:
      return action.tiers;
    case ADD_TIER:
      return {...state, [action.tier.id]: action.tier};
    case REMOVE_TIER:
      let newState = {...state};
      delete newState[action.tierId]
      return newState;
    default:
      return state;
  }
};

export default tiersReducer;