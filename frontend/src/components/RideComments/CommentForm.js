import { createComment, updateComment } from "../../store/comments";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/session";


const CommentForm = ({rideId, comment, setShowCommentForm}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser)
  const [body, setBody] = useState(comment ? comment.body : '');

  const submitButton = document.getElementById('submit-button');

  if (body === '' && submitButton) {
    submitButton.setAttribute('class', 'post-button-inactive');
  } else if (submitButton) {
    submitButton.setAttribute('class', 'post-button');
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setBody(comment.body);
    setShowCommentForm(false);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.length) {
      let newComment = {
        body: body,
        commenter_id: currentUser.id,
        ride_id: rideId
      }
      if (comment) {
        newComment['id'] = comment.id;
        dispatch(updateComment(newComment));
        setShowCommentForm(false);
      } else {
        dispatch(createComment(newComment));
      }
      setBody('')
    }
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
        <div className='update-comment-container'>
        <button id='submit-button' className='post-button-inactive' >Post</button>
        {comment && 
        <button onClick={handleCancel} className='post-button' >Cancel</button>
        }
        </div>
      </form>
    </div>
  )
}

export default CommentForm;