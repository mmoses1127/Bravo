export const ADD_USERS_VIEW = 'ADD_USER_VIEW';
export const ADD_USER_VIEW = 'ADD_USER_VIEW';

const addUser = user => {
  return ({
    type: ADD_USER_VIEW,
    user
  })
};

const addUsers = users => {
  return ({
    type: ADD_USERS_VIEW,
    users
  })
};

export const fetchUser = userId => async dispatch => {
  const res = await fetch(`api/users/${userId}`);

  if(res.ok) {
    const user = await res.json();
    dispatch(fetch(user))
  };
};

export const fetchUsers = () => async dispatch => {
  const res = await fetch(`api/users/`);

  if(res.ok) {
    const users = await res.json();
    dispatch(fetch(users))
  };
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_USERS_VIEW:
      return action.users;
    case ADD_USER_VIEW:
      return {...state, [action.user.id]: action.user};
    default:
      return state;
  }
};

export default usersReducer;