import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import phonesImage from "../../assets/landing_page_phones.jpg";
import "./HomePage.css";
import { useDispatch } from "react-redux";
import { getCurrentUser, login } from "../../store/session";
import { useHistory } from "react-router-dom";
import { useState } from "react";


const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);


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

  const currentUser = useSelector(getCurrentUser);

  if (currentUser !== null) return (<Redirect to={`/dashboard`}></Redirect>)

  return (
    <>
      <div id="landing-page">
        <div id="landing-main">
          <div className="landing-row">
            <h2>The #1 app for runners and cyclists</h2>
          </div>
          <div className="landing-row">
            <div className="landing-col">
              <img src={phonesImage} alt="Devices"/>
            </div>
            <div className="landing-col">
              <button onClick={demoLogin} className="landing-button">Demo User Login
                {loading && <div className="spin"></div>}
              </button>
              {<ul className='errors'>
              {errors.map(error => <li key={error}>{error.message}</li>)}
              </ul>}
              <button onClick={() => history.push(`/signup`)} className="landing-button">Sign Up</button>
              <button onClick={() => history.push(`/login`)} className="landing-button">Log In</button>
              <div id="landing-disclaimer">
                <p>
                  By signing up for Bravo, you agree to the Terms of Service. View our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

};

export default HomePage;