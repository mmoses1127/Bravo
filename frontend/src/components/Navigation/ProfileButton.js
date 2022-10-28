import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { logout} from "../../store/session";


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
      <button onClick={openMenu}> <i className="fa-solid fa-jet-fighter-up"></i> </button>

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