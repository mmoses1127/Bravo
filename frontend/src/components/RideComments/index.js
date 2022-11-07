import RideCommentsItem from "./RideCommentsItem";
import { useSelector } from "react-redux";
import { getRideComments } from "../../store/comments";


const RideComments = ({ride}) => {
  const thisRideComments = useSelector(getRideComments(ride.id));
  
  return (
    <div className="comments-field">
      {thisRideComments.length > 0 && thisRideComments.map(comment => {
        return <RideCommentsItem key={comment.id} comment={comment}/>
      })}
    </div>
  )


};

export default RideComments;