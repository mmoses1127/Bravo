// export const ADD_USERS = 'ADD_USER';
// export const ADD_USER = 'ADD_USER';

// const addUser = user => {
//   return ({
//     type: ADD_USER,
//     user
//   })
// };

// const addUsers = users => {
//   return ({
//     type: ADD_USERS,
//     users
//   })
// };

// export const fetchUser = userId => async dispatch => {
//   const res = await fetch(`api/users/${userId}`);

//   if(res.ok) {
//     const user = await res.json();
//     dispatch(fetch(user))
//   };
// };

// export const fetchUsers = () => async dispatch => {
//   const res = await fetch(`api/users/`);

//   if(res.ok) {
//     const users = await res.json();
//     dispatch(fetch(users))
//   };
// };

// const usersReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ADD_USERS:
//       return action.users;
//     case ADD_USER:
//       return {...state, [action.user.id]: action.user};
//     default:
//       return state;
//   }
// };

// export default usersReducer;