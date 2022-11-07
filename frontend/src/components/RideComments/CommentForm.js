import { createComment, fetchComments } from "../../store/comments";
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
      commenter_id: currentUser.id,
      ride_id: rideId
    }
    dispatch(createComment(newComment));
    // dispatch(fetchComments());
    setBody('')
  };

  if (!currentUser) return null;

  return (
    <div className="comment-form-container">
      <div className="commenter-image-zone">
        <img className="comment-profile-pic" src={currentUser.profilePicUrl} alt='User Profile Pic'/>
      </div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <label className="comment-text-label">
          <textarea autoFocus className="comment-text-area" onChange={e => setBody(e.target.value)} value={body} rows='3' cols='20' placeholder="Add a comment!">Add a comment</textarea>
        </label>
        <button className="post-button">Post</button>
      </form>
    </div>
  )
}

export default CommentForm;