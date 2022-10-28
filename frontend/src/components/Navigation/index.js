import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import stravaLogo from "../../assets/strava_logo.svg";
import './Navigation.css';


const Navigation = () => {
const user = useSelector(state => state.session.user);

  if (!user) {
    return (

      <div id='nav-bar'>
        <div className='nav-item'>
        <NavLink exact to="/"><img src={stravaLogo} alt="Strava Logo" /></NavLink>
        </div>
        <div className='nav-item'>
        <NavLink exact to="/signup"><button>Sign Up</button></NavLink>
        </div>
      </div>
    );

  } else {
    return (
      <div id='nav-bar'>
        <div className='nav-item'>
        <NavLink exact to="/"><img src={stravaLogo} alt="Strava Logo" /></NavLink>
        </div>
        <div id="nav-main">
          
        </div>
        <div className='nav-item'>
        <ProfileButton user={user}/>
        </div>
      </div>

      // <ul>
      //   <NavLink to="/">Home Page</NavLink>
      //   <ProfileButton user={user}/>
      // </ul>
    );
  };
}


export default Navigation;