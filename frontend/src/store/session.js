import csrfFetch from './csrf.js'

const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';

export const signup = inputs => async dispatch => {
  let {username, email, password} = inputs;
  let res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    })
  })
  let data = await res.json();
  storeCurrentUser(data.user);
  dispatch(addCurrentUser(data.user));
};

export const logout = () => async dispatch => {
  const res = await csrfFetch(`api/session`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeCurrentUser());
    storeCurrentUser(null);
    return res;
  }
}

export const addCurrentUser = (user) => {
  return ({
    type: ADD_USER,
    payload: user
  });
};

export const removeCurrentUser = () => {
  return ({
    type: REMOVE_USER,
  });
};

export const restoreSession = () => async dispatch => {
  let res = await csrfFetch('/api/session');
  storeCSRFToken(res);
  let data = await res.json();
  storeCurrentUser(data.user);
  dispatch(addCurrentUser(data.user));
  return res;
}

export const storeCurrentUser = (user) => {
  if (user) {
    sessionStorage.setItem('currentUser',JSON.stringify(user));
  } else {
    sessionStorage.removeItem("currentUser");
  }
}

export const storeCSRFToken = (res) => {
  const token = res.headers.get('X-CSRF-Token');
  if (token) sessionStorage.setItem('X-CSRF-Token', token);
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  let res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });
  let data = await res.json();
  dispatch(addCurrentUser(data.user));
  storeCurrentUser(data.user)
  return res;
}

let user = JSON.parse(sessionStorage.getItem("currentUser"));
const initialState = { user: user}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: action.payload }
    case REMOVE_USER:
      return { ...state, user: null}
    default:
      return state;
  }
}

export default sessionReducer;