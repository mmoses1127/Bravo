import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './LoginForm.css';


const LoginFormPage = () => {

  const history = useHistory();
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
  };

  const demoLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    await dispatch(sessionActions.login({email: 'demo@user.io', password: 'password'}));
  };

  if (currentUser !== null) return <Redirect to={`/users/${currentUser.id}`} />;

  return (
    <div className="splash-background">
      <div className="panel-registration">
        <h1>Login</h1>
        <div className="signup-form">
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <form onSubmit={handleLogin}>
            <input placeholder="Email:" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password:" value={password} onChange={e => setPassword(e.target.value)} />
            <button>Log In
              {loading && <div className="spin"></div>}
            </button>
            <button onClick={demoLogin}>Demo Login
              {loading && <div className="spin"></div>}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}


export default LoginFormPage;