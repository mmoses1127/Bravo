import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import stravaLogo from "../../assets/strava_logo.svg";


const Navigation = () => {
const user = useSelector(state => state.session.user);

  if (!user) {
    return (

      <div id='nav-bar'>
        <NavLink exact to="/"><img src={stravaLogo} alt="Strava Logo" /></NavLink>
        <NavLink exact to="/signup"><button>Sign Up</button></NavLink>
      </div>

      // <ul>
      //   <li><NavLink exact to="/"/>Home Page</li>
      //   <li><NavLink exact to="/login"/>Log In</li>
      //   <li><NavLink exact to="/signup"/>Sign Up</li>
      // </ul>
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