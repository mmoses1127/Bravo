import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';


const LoginFormPage = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(sessionActions.getCurrentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({email, password}))
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
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({email: 'demo@user.io', password: 'password'}));
  };

  if (currentUser !== null) return <Redirect to="/" />;

  return (
    <div className="splash-background">
      <div className="panel-registration">
        <h1>Login</h1>
        <div id="login-form">
          <form onSubmit={handleLogin}>
            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <input placeholder="Email:" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password:" value={password} onChange={e => setPassword(e.target.value)} />
            <button>Log In</button>
            <button onClick={demoLogin}>Demo Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}


export default LoginFormPage;