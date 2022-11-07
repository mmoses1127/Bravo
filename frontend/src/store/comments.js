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
    return comment.ride_id = rideId;
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
  
}