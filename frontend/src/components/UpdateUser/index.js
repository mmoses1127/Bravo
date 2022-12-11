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
  const [profilePic, setProfilePic] = useState('');
  const [name, setName] = useState(user?.name);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUser(user?.id));
  }, [user, dispatch]);

  const handleFile = (e) => {
    const picture = e.currentTarget.files[0];
    setProfilePic(picture);
  };

  const formSubmitButton = document.getElementById('form-submit-button')

  const handleSubmit = async (e) => {
    setLoading(true);
    formSubmitButton.setAttribute(`id`, `clicked-button`);
    formSubmitButton.disabled = true;
    e.preventDefault();
    setErrors([]);

    const updatedUser = new FormData();
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
    setLoading(false);
    history.push(`/`);
  };

  return (
    <div className='update-user-page-container'>
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
          <legend>Edit Profile Picture</legend>
          <img className="update-user-pic" src={user?.profilePicUrl} alt='Profile Pic' />
          <div className='photo-upload-zone'>
            <label>
              <input className='file-input update-user-pic-button' type='file' onChange={handleFile}></input>
            </label>
          </div>
        </fieldset>

        <div className='form-submit-area'>
          <button id='form-submit-button' className="relative-button">Update User Info
            {loading && <div className="spin"></div>}
          </button>
          <Link to={`/dashboard`}>Cancel</Link>
        </div>

        {<ul className='errors'>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>}

      </form>
    </div>
  )



};

export default UserShow;