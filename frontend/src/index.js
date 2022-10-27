import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch, {restoreCSRF} from './store/csrf';
import * as sessionActions from './store/session';
// import { login } from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const renderApplicaton = () => {
  return ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if(sessionStorage.getItem('X-CSRF-Token') === null || sessionStorage.getItem('currentUser') === null){
  // store.dispatch(sessionActions.restoreSession()).then(renderApplicaton);
  store.dispatch(sessionActions.restoreSession()).then(renderApplicaton);
} else {
  renderApplicaton();
}

// renderApplicaton();

// sessionActions.restoreSession().then(renderApplicaton);
