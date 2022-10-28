import { useState } from "react";
import { signup, login } from "../../store/session";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import './SignupForm.css'

const SignupFormPage = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const currentUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(signup({email, password}))
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
    dispatch(login({credential: 'demo@user.io', password: 'password'}));
  };

  if (currentUser) return <Redirect to="/" />;

  return (
    <div className="splash-background">
      <div className="panel-registration">
        <h1>Join Strava today,<br></br> it's Free.</h1>
        <div id="signup-form">
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button>Sign Up</button>
            <button onClick={demoLogin}>Demo Login</button>
          </form>
        </div>
        <div id="disclaimer">
          <p>
            By signing up for Strava, you agree to the Terms of Service. View our Privacy Policy.
          </p>
          <br></br>
          <p>
            Already a Member? <Link to={`/login`}>Log in</Link> 
          </p>
        </div>
      </div>
    </div>
  )
}


export default SignupFormPage;