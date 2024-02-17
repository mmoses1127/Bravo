import { useState } from "react";
import { signup, login, getCurrentUser } from "../store/session";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SignupHeader from "./SignupHeader";
import PasswordRequirements from "./PasswordRequirements";
import WelcomePane from "./WelcomePane";


const Signup = () => {
  
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const currentUser = useSelector(getCurrentUser);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const validInputs = () => {

  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors(['Passwords must match.'])
      setLoading(false);
      return null;
    } 
    setErrors([]);
    await dispatch(signup({email, password, name}))
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
    setLoading(false);
    if (!errors.length) history.push('/email-confirmation');
  };

  const demoLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    await dispatch(login({email: 'demo@user.io', password: 'password'}))
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
    setLoading(false);
  };

  if (currentUser !== null) return <Redirect to={`/dashboard`} />;

  return (
    <div className="flex flex-col w-full h-screen">
      <SignupHeader />
      <div className="flex flex-row h-full">
        <WelcomePane />
        <div className="flex flex-col items-center justify-center w-1/2">
          <div className="flex flex-col items-center justify-center w-1/2">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <label>First Name</label>
              <input className="drop-shadow bg-white border-none h-8 w-full mb-4" type="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
              <label>Last Name</label>
              <input className="drop-shadow bg-white border-none h-8 w-full mb-4" type="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
              <label>Email</label>
              <input className="drop-shadow bg-white border-none h-8 w-full mb-4" type="email" placeholder="email@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              <label>Password</label>
              <input className="drop-shadow bg-white border-none h-8 w-full mb-4" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <PasswordRequirements password={password} />
              <label>Confirm Password</label>
              <input className="drop-shadow bg-white border-none h-8 w-full mb-4" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              <button className="w-full mb-4 text-white bg-[#455A64]">Sign Up
                {loading && <div className="spin"></div>}
              </button>
              <button className="w-full mb-4 text-white bg-[#455A64]" onClick={demoLogin}>Demo Login
                {loading && <div className="spin"></div>}
              </button>
            </form>
            <p>
              Already have an account? <Link to={`/login2`}>Log in</Link> 
            </p>
          </div>
        </div>
      </div>

      {<ul className='errors'>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>}
      


    </div>

  )
}


export default Signup;