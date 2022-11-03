import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../store/users";
import { fetchUser } from "../../store/users";


const UserShow = () => {

  const dispatch = useDispatch();
  const {userId} = useParams();
  const user = useSelector(getUser(userId));
  console.log(user)

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, []);

  return (
    <>
      <h1>User Show</h1>
      <p>{user && <img src={user.profilePicUrl}/>}</p>
    </>
  )



};

export default UserShow;