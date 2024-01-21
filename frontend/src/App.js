import {Switch, Route, Redirect} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import React from 'react';
import SignupFormPage from './components/signup';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import RideForm from './components/RideForm';
import RideShow from './components/RideShow';
import RideEdit from './components/RideEdit';
import UserShow from './components/UpdateUser';
import Footer from './components/Footer';
import CreateRideMap from './components/RideForm/CreateRideMap';
import ContactAdd from './components_unetwrk/ContactAdd';
import Dashboard2 from './components_unetwrk/Dashboard2';


function App() {

  return (
    <>
      {/* <Navigation /> */}
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>        
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/dashboard">
          <Dashboard/>
        </Route>
        <Route path="/create-ride-manual">
          <RideForm />
        </Route>
        <Route path="/create-ride-map">
          <CreateRideMap />
        </Route>
        <Route path="/rides/:rideId/edit">
          <RideEdit/>
        </Route>        
        <Route path="/rides/:rideId">
          <RideShow/>
        </Route>
        <Route path="/users/:userId">
          <Dashboard/>
        </Route>
        <Route path="/profile">
          <UserShow/>
        </Route>


        <Route path="/kanban">
          <Dashboard2/>
        </Route>
        <Route path="/add-contact">
          <ContactAdd/>
        </Route>

        <Route path="">
          <Redirect to="/"/>
        </Route>
      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default App;
