import { Redirect } from "react-router-dom";



const HomePage = () => {


  if (user) return (<Redirect to={`/dashboard`}></Redirect>)
  return (
    <div id='home-main'>
      <p>hello from homepage</p>
    </div>
  );

};

export default HomePage;