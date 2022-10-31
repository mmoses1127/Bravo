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

export const fetchUser = userId => async dispatch => {
  const res = await fetch(`api/users/${userId}`);

  if(res.ok) {
    const user = await res.json();
    dispatch(addUserView(user))
  };
};

export const fetchUsers = () => async dispatch => {
  const res = await fetch(`api/users/`);

  if(res.ok) {
    const users = await res.json();
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