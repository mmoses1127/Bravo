import { useState } from "react";
import { signup, login, getCurrentUser } from "../../store/session";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import './SignupForm.css';


const SignupFormPage = () => {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const currentUser = useSelector(getCurrentUser);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
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
  };

  const demoLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    await dispatch(login({email: 'demo@user.io', password: 'password'}));
  };

  if (currentUser !== null) return <Redirect to={`/users/${currentUser.id}`} />;

  return (
    <div className="splash-background">
      <div className="panel-registration">
        <h1>Join Strava today,<br></br> it's Free.</h1>
        <div className="signup-form">
          {<ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>}
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button>Sign Up
              {loading && <div className="spin"></div>}
            </button>
            <button onClick={demoLogin}>Demo Login
              {loading && <div className="spin"></div>}
            </button>
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