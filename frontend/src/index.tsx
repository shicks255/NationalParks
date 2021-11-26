import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppState, Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import App from './App';
import useRecordSignup from './RecordSignup';
// import reportWebVitals from './reportWebVitals';

// const redirectCallback = (appState: AppState) => {
//   console.log("hi");
//   console.log(appState);
//   useRecordSignup();
// };

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      redirectUri={window.location.origin}
      // onRedirectCallback={useRecordSignup}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
