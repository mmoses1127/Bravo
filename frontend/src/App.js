import {Switch, Route, Redirect} from 'react-router-dom';
import React from 'react';
import ContactAdd from './components_unetwrk/ContactShow';
import Dashboard2 from './components_unetwrk/Dashboard2';
import Signup from './components_unetwrk/Signup';
import Login from './components_unetwrk/Login';
import EmailConfirmation from './components_unetwrk/EmailConfirmation';
import ChoosePlan from './components_unetwrk/ChoosePlan';
import { useSelector } from 'react-redux';
import { getCurrentUser } from './store/session';


function App() {
  
  const currentUser = useSelector(getCurrentUser);

  return (
    <>
      {currentUser ? 
      <Switch>

        <Route path="/kanban">
          <Dashboard2/>
        </Route>
        <Route path="/add-contact">
          <ContactAdd/>
        </Route>
        <Route path="/signup">
          <Redirect to="/kanban"/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/email-confirmation">
          <EmailConfirmation/>
        </Route>
        <Route path="/choose-plan">
          <ChoosePlan/>
        </Route>        
        <Route path="">
          <Redirect to="/kanban"/>
        </Route>


      </Switch>
        

        
         : 
        <Switch>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/email-confirmation">
            <EmailConfirmation/>
          </Route>
          <Route path="">
            <Redirect to="/signup"/>
          </Route>
        </Switch>
        
      }
    </>
  );
}

export default App;
