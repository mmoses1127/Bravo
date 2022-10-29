import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { logout} from "../../store/session";
import avatar from "../../assets/mtb1.jpg"


const ProfileButton = ({user}) => {
  
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    document.addEventListener('click', () => setShowMenu(false));

    return () => document.removeEventListener('click', () => setShowMenu(false))
  }, [showMenu])

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  }


  return (
    <>
      <img class="avatar-image" onClick={openMenu} src={avatar} alt="Avatar"/>

      {showMenu && (<ul>
        <li>{user.email}</li>
        <li>
          <button onClick={logoutHandler}>Log Out</button>
        </li>
      </ul>
      )}
    </>
  )
}

export default ProfileButton;