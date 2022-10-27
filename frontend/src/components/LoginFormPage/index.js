import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';


const LoginFormPage = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(state => (state.session.user));
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({credential, password}))
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
    // setCredential('');
    // setPassword('');
  }


  if (currentUser) return <Redirect to="/" />;

  return (
    <div className="splash-background">
      <div id="login-form">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <input placeholder="Username or Email:" value={credential} onChange={e => setCredential(e.target.value)} />
        <input type="password" placeholder="Password:" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="Log In" />
      </form>
      </div>
    </div>
  )
}


export default LoginFormPage;