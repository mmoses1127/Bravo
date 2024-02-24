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

  const validInputs = (password, confirmPassword) => {
    let errors = [];
    if (!passReqs.hasUpperCase(password)) errors.push('Password must contain at least one uppercase letter.');
    if (!passReqs.hasLowerCase(password)) errors.push('Password must contain at least one lowercase letter.');
    if (!passReqs.hasNumber(password)) errors.push('Password must contain at least one number.');
    if (!passReqs.hasEightChars(password)) errors.push('Password must be at least 8 characters long.');
    if (password !== confirmPassword) errors.push('Passwords must match.');
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let currentErrors = validInputs(password, confirmPassword);
    setErrors(validInputs(password, confirmPassword));
    // setLoading(true);
    // if (password !== confirmPassword) {
    //   setErrors(['Passwords must match.'])
    //   setLoading(false);
    //   return null;
    // } 

    if (currentErrors.length) {
      setLoading(false);
      return null;
    } else {
      await dispatch(signup({email, password, name, plan: 'free'}))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(...errors, data.errors);
        else if (data) setErrors([...errors, ...data]);
        else setErrors([...errors, res.statusText]);
      });
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

  if (currentUser !== null) return <Redirect to={`/kanban`} />;

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
              <PasswordRequirements password={password} />
              <label>Confirm Password</label>
              <input className="drop-shadow bg-white border-none h-8 w-full mb-4" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            {<ul className='mb-3'>
              {errors.map(error => <li className="text-error-red font-bold" key={error}>{error}</li>)}
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