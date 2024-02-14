import logo from '../assets/Logo.png';

const SignupHeader = () => {

  return (

    <div className="flex flex-row justify-start p-2 w-screen border-solid border-b-4 border-brand-primary">
      <img src={logo} alt="Unetwrk Logo" />
    </div>

  )

}

export default SignupHeader;