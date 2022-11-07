import csrfFetch from "./csrf";


export const ADD_ALL_COMMENTS = 'ADD_ALL_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const addAllComments = (comments) => ({
  type: ADD_ALL_COMMENTS,
  comments
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
});

const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId
});


export const getComments = (state = {}) => {
  if (!state.comments) return [];
  return state.comments;
};

export const getRideComments = (rideId) => (state = {}) => {
  if (!state.comments) return [];
  return Object.values(state.comments).filter(comment => {
    return comment.rideId === rideId;
  });
};

export const fetchComments = (comments) => async dispatch => {
  const res = await fetch(`api/comments`);

  if (res.ok) {
    const comments = await res.json();
    dispatch(addAllComments(comments));
  };
};

export const createComment = (comment) => async dispatch => {
  const res = await csrfFetch(`api/comments`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
  });

  if (res.ok) {
    const newComment = await res.json();
    dispatch(addComment(newComment));
  };
};

export const deleteComment = (commentId) => async dispatch => {
  const res = await csrfFetch(`api/comments`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeComment(commentId));
  };
};

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ALL_COMMENTS:
      return action.comments;
    case ADD_COMMENT:
      return {...state, [action.comment.id]: action.comment};
    case REMOVE_COMMENT:
      let newState = {...state};
      delete newState[action.commentId]
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;