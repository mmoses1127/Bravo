import {Switch, Route, useParams} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import React from 'react';
import SignupFormPage from './components/signup';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import RideForm from './components/RideForm';
import RideShow from './components/RideShow';
import RideEdit from './components/RideEdit';
import UserShow from './components/UserShow';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import { getCurrentUser } from './store/session';


function App() {
  const currentUser = useSelector(getCurrentUser);
  const {userId} = useParams();

  return (
    <>
      <Navigation />
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
        <Route path="/create-ride">
          <RideForm />
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
      </Switch>
      <Footer />
    </>
  );
}

export default App;
