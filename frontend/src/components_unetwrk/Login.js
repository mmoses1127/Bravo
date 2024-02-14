import React, { useState } from 'react';
import * as sessionActions from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignupHeader from "./SignupHeader";
import WelcomePane from "./WelcomePane";
import { Link } from 'react-router-dom';


const Login = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(sessionActions.getCurrentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    setLoading(true);

    e.preventDefault();
    setErrors([]);
    await dispatch(sessionActions.login({email, password}))
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

  const demoLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    await dispatch(sessionActions.login({email: 'demo@user.io', password: 'password'}))
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
      <div className="flex flex-row border-solid border-green-200 h-full">
        <WelcomePane />
        <div className="flex flex-col items-center justify-center w-1/2">
          <div className="flex flex-col items-center justify-center w-1/2">
            <div className='flex flex-col items-start w-full mb-3'>
              <h1 className='text-3xl'>Log in</h1>
              <h3 className='text-xl'>Log in to your account</h3>
            </div>
            <form onSubmit={handleLogin}>
              <label>Email address</label>
              <input className="drop-shadow bg-white border-none h-8 w-full mb-4" type="email" placeholder="email@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              <label>Password</label>
              <input className="drop-shadow bg-white border-none h-8 w-full mb-4" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <label>Confirm Password</label>
              <p className='text-blue-700 decoration-solid'>Forgot Your Password?</p>
              <button className="w-full mb-4 text-white bg-[#455A64]">Log in
                {loading && <div className="spin"></div>}
              </button>
              <button className="w-full mb-4 text-white bg-[#455A64]" onClick={demoLogin}>Demo Login
                {loading && <div className="spin"></div>}
              </button>
            </form>
            <p>
              Don't have an account? <Link to={`/signup2`}>Sign up</Link> 
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


export default Login;