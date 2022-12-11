import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import './Navigation.css';
import AddRideButton from "./AddRideButton";
import { getCurrentUser } from "../../store/session";
import bravoLogo from '../../assets/bravo_logo.png';


const Navigation = () => {
  const currentUser = useSelector(getCurrentUser);
  const url = document.location.href;
  let urlFinal = url.split('/')
  urlFinal = urlFinal[urlFinal.length - 1];

  if (!currentUser) {
    return (
      <div id="nav-container">
        <div id='nav-bar'>
          <div className='nav-item'>
          <NavLink exact to="/"><img className='top-logo' src={bravoLogo} alt="Strava Logo" /></NavLink>
          </div>
          <div className='nav-item'>
          <NavLink exact to={urlFinal === 'signup' ? `/Login` : `/signup`}><button>{urlFinal === 'signup' ? `Login` : `Signup`}</button></NavLink>
          </div>
        </div>
      </div>
    );

  } else {
    return (
      <div id="nav-container">
        <div id='nav-bar'>
          <div className='main-logo'>
          <NavLink exact to="/"><img className='top-logo' src={bravoLogo} alt="Strava Logo" /></NavLink>
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