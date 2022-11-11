import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { logout} from "../../store/session";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../../store/session";

const ProfileButton = ({user}) => {

  const history = useHistory();  
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const currentUser = useSelector(getCurrentUser)

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false)
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push(`/`);
  };


  return (
    <div onMouseEnter={openMenu} onMouseLeave={closeMenu} className="profile-drop-down, nav-dropdown">
      <div className='nav-bar-component'>
        <img className="avatar-image" src={currentUser.profilePicUrl} alt="Avatar"/>
        <i className="fa-solid fa-angle-down"></i>
      </div>
      {showMenu && (<ul className='dropdown-list'>
        <li className="dropdown-item" onClick={() => history.push(`/profile`)}>Profile</li>
        <li className="dropdown-item" onClick={logoutHandler}>Log Out</li>
      </ul>
      )}
    </div>

  );
};

export default ProfileButton;