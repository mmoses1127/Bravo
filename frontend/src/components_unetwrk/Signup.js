import { useState } from "react";
import { signup, login, getCurrentUser } from "../store/session";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SignupHeader from "./SignupHeader";
import PasswordRequirements from "./PasswordRequirements";
import WelcomePane from "./WelcomePane";
import { useHistory } from "react-router-dom";
import * as passReqs from "./PasswordRequirements";
import {checkErrors} from "./Utils";

const Signup = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const currentUser = useSelector(getCurrentUser);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validInputs = (password, confirmPassword, name) => {
    let errors = [];
    if (!passReqs.hasUpperCase(password)) errors.push('');
    if (!passReqs.hasLowerCase(password)) errors.push('');
    if (!passReqs.hasNumber(password)) errors.push('');
    if (!passReqs.hasEightChars(password)) errors.push('');
    if (password !== confirmPassword) errors.push('Passwords must match.');
    if (!name.length) errors.push('Name cannot be empty.');
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    let currentErrors = validInputs(password, confirmPassword, name);
    setErrors(validInputs(password, confirmPassword, name));

    if (currentErrors.length) {
      setLoading(false);
      return null;
    } else {
      await dispatch(signup({email, password, name, plan: 'free'}))
      .catch(async (res) => checkErrors(res, setErrors));
      setLoading(false);
      if (!errors.length && validInputs(password)) {
        history.push('/email-confirmation');
        console.log('all checks pass')
      }
    }
  };

  const demoLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    await dispatch(login({email: 'demo@user.io', password: 'password'}))
    .catch(async (res) => checkErrors(res, setErrors));
    setLoading(false);
  };


  return (
    <div className="flex flex-col w-full h-screen">
      <SignupHeader />
      <div className="flex flex-row h-full">
        <WelcomePane />
        <div className="flex flex-col items-center justify-center w-1/2">
          <div className="flex flex-col items-center justify-center w-1/2">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input className="drop-shadow bg-white border-none h-8 w-full mb-4" type="lastName" value={name} onChange={e => setName(e.target.value)} />
              <label>Email</label>
              <input className="drop-shadow bg-white border-none h-8 w-full mb-4" type="email" placeholder="email@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              <label>Password</label>
              <input className="drop-shadow bg-white border-none h-8 w-full mb-1" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <PasswordRequirements password={password} submitted={submitted}/>
              <label>Confirm Password</label>
              <input className="drop-shadow bg-white border-none h-8 w-full mb-4" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            {<ul className='mb-3 min-h-[70px]'>
              {errors.map(error => {
                if (error != '') {
                  return <li className="text-error-red font-bold" key={error}>{error}</li>
                }
              })}
            </ul>}
              <button className="w-full mb-4 text-white bg-[#455A64]">Sign Up
                {loading && <div className="spin"></div>}
              </button>
              <button className="w-full mb-4 text-white bg-[#455A64]" onClick={demoLogin}>Demo Login
                {loading && <div className="spin"></div>}
              </button>
            </form>
            <p>
              Already have an account? <Link to={`/login`}>Log in</Link> 
            </p>
          </div>
        </div>
      </div>

      


    </div>

  )
}


export default Signup;