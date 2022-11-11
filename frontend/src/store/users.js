import csrfFetch from "./csrf";

export const ADD_USER = 'ADD_USER';
export const ADD_USERS = 'ADD_USERS';

const addUser = user => {
  return ({
    type: ADD_USER,
    user
  })
};

const addUsers = users => {
  return ({
    type: ADD_USERS,
    users
  })
};

export const getUsers = (state) => {
  if (!state.users) return [];
  return Object.values(state.users);
};

export const getUser = userId => (state) => {
  if (!state.users) return null;
  return state.users[userId];
}

export const fetchUser = userId => async dispatch => {
  const res = await fetch(`/api/users/${userId}`);

  if(res.ok) {
    const user = await res.json();
    dispatch(addUser(user))
  };
};

export const fetchUsers = () => async dispatch => {
  const res = await fetch(`/api/users/`);

  if(res.ok) {
    const users = await res.json();
    dispatch(addUsers(users))
  };
};

export const updateUser = (user) => async dispatch => {
  const res = await csrfFetch(`/api/users/${user.id}`, {
    method: 'PATCH',
    body: user
  });

  if(res.ok) {
    const revisedUser = await res.json();
    dispatch(addUser(revisedUser))
    return revisedUser;
  };

};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_USERS:
      return action.users;
    case ADD_USER:
      return {...state, [action.user.id]: action.user}
    default:
      return state;
  }
};

export default usersReducer;