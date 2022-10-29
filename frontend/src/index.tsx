import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// import reportWebVitals from './reportWebVitals';

// const redirectCallback = (appState: AppState) => {
//   console.log("hi");
//   console.log(appState);
//   useRecordSignup();
// };

const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN ?? '';
const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID ?? '';
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        redirectUri={window.location.origin}
        // onRedirectCallback={useRecordSignup}
      >
        <App />
      </Auth0Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
