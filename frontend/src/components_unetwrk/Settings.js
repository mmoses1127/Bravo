import SignupHeader from "./SignupHeader";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/session";
import { useState } from "react";
import PasswordRequirements from "./PasswordRequirements";
import { updateUser } from "../store/users";
import { validInputs, checkErrors, isEmail } from "./Utils";
import { useHistory } from "react-router-dom";

const Settings = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(getCurrentUser);
  const [email, setEmail] = useState(currentUser.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showPasswordButtons, setShowPasswordButtons] = useState(false);
  const [showEmailUpdate, setShowEmailUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async e => {
    e.preventDefault();
    setSubmitted(true);

    let currentErrors = validInputs(newPassword, confirmPassword);
    setErrors(currentErrors);

    if (currentErrors.length) {
      setLoading(false);
      return null;
    } else {
      setShowPasswordButtons(false);
      setLoading(true);
      await dispatch(updateUser({...currentUser, password: newPassword}))
      .catch(async (res) => checkErrors(res, setErrors));

      if (!errors.length) {
        history.push('/email-confirmation');
      }
    }
  }

  const handleInputPassword = e => {
    setCurrentPassword(e.target.value);
    setShowPasswordButtons(e.target.value.length > 0 ? true : false);
  }

  const handleUpdateEmail = async e => {
    e.preventDefault();
    setShowEmailUpdate(false);
    console.log('email', email);
    console.log('isemail', isEmail(email));
    if (!isEmail(email)) setErrors([...errors, 'Invalid email address.']);
    await dispatch(updateUser({...currentUser, email}))
    .catch(async (res) => checkErrors(res, setErrors));
    if (!errors.length) {
      setShowEmailUpdate(false);
      history.push('/email-confirmation');
    } else {
      alert([errors[0]]);
    }
  }


  return (

    <div className="flex flex-col w-full h-screen">
      <SignupHeader />
      <div className="flex flex-col items-center h-screen">
        <p className="text-4xl font-semibold m-16">Settings</p>
        <div className="flex flex-col items-center bg-background-disabled w-1/2 p-6">
        {showEmailUpdate ? 
        <div className="flex flex-col justify-between w-3/4 mb-5">
          <div className="mb-5">
            <label className="font-semibold">Email address</label>
            <input className="drop-shadow bg-white border-none h-8 w-full mb-1" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="w-full flex flex-row justify-evenly">
            <button onClick={e => setShowEmailUpdate(false)} className="button-white">Cancel
              {loading && <div className="spin"></div>}
            </button>
            <button className="button disabled:bg-text-secondary disabled:cursor-not-allowed" disabled={!isEmail(email)} onClick={handleUpdateEmail}>Update email address
              {loading && <div className="spin"></div>}
            </button>
            </div>
        </div>        
        :
        <div className="flex flex-row justify-between w-3/4 mb-5">
          <div>
            <p className="font-semibold">Email Address</p>
            <p>{currentUser.email}</p>
          </div>
          <div>
            <i onClick={e => setShowEmailUpdate(true)} className="fa-solid fa-pencil cursor-pointer"></i>
          </div>
        </div>
        }
          <form className="w-3/4">
            <label className="font-semibold">Current password</label>
            <input className="drop-shadow bg-white border-none h-8 w-full mb-1" type="password" value={currentPassword} onChange={handleInputPassword} />
            <p className='text-link-blue font-semibold underline decoration-solid mb-5'>Forgot Your Password?</p>
            <label className="font-semibold">Enter new password</label>
            <input className="drop-shadow bg-white border-none h-8 w-full mb-1" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <PasswordRequirements password={newPassword} submitted={submitted}/>
            <label className="font-semibold">Re-enter new password</label>
            <input className="drop-shadow bg-white border-none h-8 w-full mb-4" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          {<ul className='mb-3 min-h-[70px]'>
            {errors.map(error => {
              if (error != '') {
                return <li className="text-error-red font-bold" key={error}>{error}</li>
              }
            })}
          </ul>}
            {showPasswordButtons && 
            <div className="w-full flex flex-row justify-evenly">
              <button onClick={e => setShowPasswordButtons(false)} className="button-white">Cancel
                {loading && <div className="spin"></div>}
              </button>
              <button className="button" onClick={handleUpdatePassword}>Update Password
                {loading && <div className="spin"></div>}
              </button>
            </div>

  }
          </form>
        </div>
      </div>
    </div>

  )

}

export default Settings;