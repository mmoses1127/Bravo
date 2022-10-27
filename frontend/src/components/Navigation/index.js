import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";


const Navigation = () => {
const user = useSelector(state => state.session.user);

  if (!user) {
    return (
      <ul>
        <li><NavLink exact to="/"/>Home Page</li>
        <li><NavLink exact to="/login"/>Log In</li>
        <li><NavLink exact to="/signup"/>Sign Up</li>
      </ul>
    );
  } else {
    return (
      <ul>
        <NavLink to="/">Home Page</NavLink>
        <ProfileButton user={user}/>
      </ul>
    );
  };
}


export default Navigation;