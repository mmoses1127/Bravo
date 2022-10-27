import { useState } from "react";
import { signup } from "../../store/session";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './SignupForm.css'

const SignupFormPage = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const currentUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(signup({username, email, password}))
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

  if (currentUser) return <Redirect to="/" />;

  return (
    <div id="signup-form">
      <h1>Sign Up Form</h1>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <button>Sign Up</button>
      </form>
    </div>
  )
}


export default SignupFormPage;