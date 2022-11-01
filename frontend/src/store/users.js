export const ADD_USER_VIEW = 'ADD_USER_VIEW';
export const ADD_USERS = 'ADD_USERS';

const addUserView = user => {
  return ({
    type: ADD_USER_VIEW,
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
    dispatch(addUserView(user))
  };
};

export const fetchUsers = () => async dispatch => {
  const res = await fetch(`/api/users/`);

  if(res.ok) {
    const users = await res.json();
    console.log(`inside fetchusers users is ${users}`)
    dispatch(addUsers(users))
  };
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_USERS:
      return action.users;
    case ADD_USER_VIEW:
      return {...state, [action.user.id]: action.user}
    default:
      return state;
  }
};

export default usersReducer;