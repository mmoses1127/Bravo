
const AddRideButton = () => {

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    // if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false)
  };

  // const logoutHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(logout());
  // }

  return (

    <div onMouseEnter={openMenu} onMouseLeave={closeMenu} className="profile-drop-down">

      <button className="dropdown" id="add-ride-button">
        <i className="fa-solid fa-plus"></i>
      </button>

      {showMenu && (<ul>
        <li><Link to={`/profile`}>Profile</Link></li>
        <li>
          <button onClick={logoutHandler}>Log Out</button>
        </li>
      </ul>
      )}

      </div>
  );

};



  export default AddRideButton;