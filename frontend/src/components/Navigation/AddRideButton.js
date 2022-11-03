import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const AddRideButton = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false)
  };


  return (

    <div onMouseEnter={openMenu} onMouseLeave={closeMenu} className="profile-drop-down, nav-dropdown">

      <button className="dropdown" id="add-ride-button">
        <i className="fa-solid fa-plus"></i>
      </button>

      {showMenu && (<ul className='dropdown-list'>
        <li className="dropdown-item" onClick={() => history.push(`/create-ride`)}>Create Ride</li>
      </ul>
      )}

      </div>
  );

};



  export default AddRideButton;