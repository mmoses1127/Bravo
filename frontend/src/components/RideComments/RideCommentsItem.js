import moment from 'moment'
import './RideComments.css'

const RideCommentsItem = ({comment}) => {
  return (
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
      </div>
    </div>
  )
}

export default RideCommentsItem;