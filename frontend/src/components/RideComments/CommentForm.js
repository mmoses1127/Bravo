import { createComment } from "../../store/comments";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";


const CommentForm = ({rideId}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser)
  const [body, setBody] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    let newComment = {
      body: body,
      giver_id: currentUser.id,
      ride_id: rideId
    }
    dispatch(createComment(newComment))
  };

  if (!currentUser) return null;

  return (
    <div className="comment-form-container">
      <div className="commenter-image-zone">
        <p>image</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
        <textarea onChange={e => setBody(e.target.value)} value={body} rows='3' cols='20'>Add a comment</textarea>
        </label>
        <button className="post-button">Post</button>
      </form>
    </div>
  )
}

export default CommentForm;