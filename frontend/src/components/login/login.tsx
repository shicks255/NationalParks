import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const Login: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <>
          <p>Log in or create an account to start tracking your visits!</p>
          <button type="button" onClick={loginWithRedirect}>
            Login
          </button>
        </>
      )}
      {isAuthenticated && (
        <button
          type="button"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Login;
