import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import stravaLogo from "../../assets/strava_logo.svg";
import './Navigation.css';
import AddRideButton from "./AddRideButton";
import { getCurrentUser } from "../../store/session";


const Navigation = () => {
  const currentUser = useSelector(getCurrentUser);

  if (!currentUser) {
    return (
      <div id="nav-container">
        <div id='nav-bar'>
          <div className='nav-item'>
          <NavLink exact to="/"><img src={stravaLogo} alt="Strava Logo" /></NavLink>
          </div>
          <div className='nav-item'>
          <NavLink exact to="/signup"><button>Sign Up</button></NavLink>
          </div>
        </div>
      </div>
    );

  } else {
    return (
      <div id="nav-container">
        <div id='nav-bar'>
          <div className='main-logo'>
          <NavLink exact to="/"><img src={stravaLogo} alt="Strava Logo" /></NavLink>
          </div>
          <div id="nav-main">
            {/* <div className='nav-dropdown'> */}
              <ProfileButton user={currentUser}/>
            {/* <button className="dropdown"></button> */}
            {/* <div className='nav-dropdown'> */}
              {/* <button className="dropdown" id="add-ride-button"> */}
              <AddRideButton />
          </div>
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