import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUser, updateUser } from "../../store/users";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addCurrentUser, getCurrentUser, storeCurrentUser } from "../../store/session";
import './UpdateUser.css'


const UserShow = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const [profilePic, setProfilePic] = useState(user?.profilePic);
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(fetchUser(user?.id));
  }, [user]);

  const handleFile = (e) => {
    const picture = e.currentTarget.file;
    setProfilePic(picture);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const updatedUser = new FormData();
    updatedUser.append('user[email]', user.email);
    updatedUser.append('user[password]', password);
    updatedUser.append('user[name]', name);
    if (profilePic) {
      updatedUser.append('user[profile_pic]', profilePic);
    };

    let returnedUser = await dispatch(updateUser(updatedUser))
    .catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });

    await dispatch(addCurrentUser(returnedUser));
    await storeCurrentUser(returnedUser);
    history.push(`/`)
  };

  return (
    <form className="update-user-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Edit Full Name</legend>
        <div className='inline-inputs'>
          <label>
            <input className='update-user-input' type='text' onChange={e => setName(e.target.value)} value={name} />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Edit Password</legend>
        <div className='inline-inputs'>
          <label>
            <input className='update-user-input' type='password' onChange={e => setPassword(e.target.value)} value={password} />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Edit Profile Pic</legend>
        <img className="update-user-pic" src={user?.profilePicUrl} alt='Profile Pic' />
        <div className='photo-upload-zone'>
          <label>
            <input className='file-input update-user-pic-button' type='file' onChange={handleFile}></input>
          </label>
        </div>
      </fieldset>

      <div className='form-submit-area'>
        <button>Update User Info</button>
        <Link to={`/dashboard`}>Cancel</Link>
      </div>

    </form>
  )



};

export default UserShow;