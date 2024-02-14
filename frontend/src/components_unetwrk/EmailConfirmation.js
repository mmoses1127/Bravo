import SignupHeader from "./SignupHeader";
import emblem from '../assets/linkedin_logo.png';
import { Link } from "react-router-dom";

const EmailConfirmation = ({email = 'email@emailaddress.com'}) => {

return (
  
  <div className="flex flex-col justify-center items-center">
    <SignupHeader />
    <div className="flex flex-col justify-center items-center w-1/2 h-screen">
      <p className="text-5xl font-semibold mb-2">Welcome to UNetwrk!</p>
      <p className="text-3xl font-medium mb-2">We sent a confirmation email to <span className="text-link-blue text-3xl font-medium">{email}</span></p>
      <p className="mb-2">It may be in your junk folder.</p>
      <p className="text-lg font-medium mb-2">Confirm your email address to log in.</p>
      <p className="text-sm mb-2"><Link to='#'>Update your email address</Link> if it's incorrect.</p>
      <div className="p-3">
        <img src={emblem} alt="Unetwrk Logo" />
      </div>
    </div>
  </div>

)

}

export default EmailConfirmation;