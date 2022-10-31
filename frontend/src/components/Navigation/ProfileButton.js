import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { logout} from "../../store/session";
import avatar from "../../assets/mtb1.jpg";
import { Link } from 'react-router-dom'


const ProfileButton = ({user}) => {
  
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    // if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false)
  };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener('click', closeMenu)
  // }, [showMenu])

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  }


  return (
    <div onMouseEnter={openMenu} onMouseLeave={closeMenu} className="profile-drop-down">
      <div>
        <img className="avatar-image" src={avatar} alt="Avatar"/>
        <i className="fa-solid fa-angle-down"></i>
      </div>
      {showMenu && (<ul>
        <li><Link to={`/profile`}>Profile</Link></li>
        <li>
          <button onClick={logoutHandler}>Log Out</button>
        </li>
      </ul>
      )}
    </div>

  )
}

export default ProfileButton;