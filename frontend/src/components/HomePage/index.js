import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";



const HomePage = () => {

  const user = useSelector(state => state.session.user);

  if (user) return (<Redirect to={`/dashboard`}></Redirect>)
  return (
    <div id='home-main'>
      <p>hello from homepage</p>
    </div>
  );

};

export default HomePage;