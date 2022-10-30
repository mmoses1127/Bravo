import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import phonesImage from "../../assets/landing_page_phones.jpg";
import "./HomePage.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom";



const HomePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login({email: 'demo@user.io', password: 'password'}));
  };

  const user = useSelector(state => state.session.user);

  if (user) return (<Redirect to={`/dashboard`}></Redirect>)

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
              <button onClick={demoLogin} className="landing-button">Demo User Login</button>
              <button onClick={() => history.push(`/signup`)} className="landing-button">Sign Up</button>
              <button onClick={() => history.push(`/login`)} className="landing-button">Log In</button>
              <div id="landing-disclaimer">
                <p>
                  By signing up for Strava, you agree to the Terms of Service. View our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="footer-logo">

            </div>
            <div className="footer-nav-group">
              <h5>Menu</h5>
              <ul className="footer-nav-list">
              <li>
                <a href="#"> Features</a>
              </li>
              <li>
                <a href="#"> Subscription</a>
              </li>
              </ul>
            </div>
            <div className="footer-nav-group">
              
            </div>
            <div className="footer-nav-group">
            
            </div>
          </div>
        </div>
      </footer>
    </>
  )

};

export default HomePage;