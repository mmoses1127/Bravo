import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../../store/session';
import { deleteComment, updateComment } from '../../store/comments.js';
import './RideComments.css';
import CommentForm from './CommentForm';
import { useState } from 'react';


const RideCommentsItem = ({comment}) => {

  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const [showCommentForm, setShowCommentForm] = useState(false);

  const deleteComment = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure? Deleting a comment is irreversible.')) {
      dispatch(deleteComment(comment.id));
    };
  }

  const editComment = (e) => {
    e.preventDefault();
    setShowCommentForm(true);
  }

  return (
    <>
      { !showCommentForm &&
      <div className="ride-comment-item">
        <div className='comment-item-left'>
          <div className="comment-profile-pic-box">
            <img className="comment-profile-pic" src={comment.profilePicUrl} alt='Profile Pic' />
          </div>
          <div className="comment-main">
            <p className='strong'>{comment.commenter}</p>
            <p>{comment.body}</p>
          </div>
        </div>
        <div className="comment-time">
          <p>{moment(comment.createdAt).fromNow()}</p>
          {currentUser.id === comment.commenterId &&
          <div className='mod-comments-section'>
            <button className='mod-comment-button' onClick={editComment}>Edit</button> 
            <button className='mod-comment-button' onClick={deleteComment}>Delete</button>
          </div>
          }
        </div>
      </div>
      }

      { showCommentForm &&
      <CommentForm comment={comment} setShowCommentForm={setShowCommentForm}/>
      }
    </>
  )

}

export default RideCommentsItem;