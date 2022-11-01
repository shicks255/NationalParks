import { useAuth0 } from '@auth0/auth0-react';
import { RiAccountCircleFill } from 'react-icons/ri';

import React from 'react';
import { IconContext } from 'react-icons';

const Login: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <IconContext.Provider value={{ size: '2.5em' }}>
      <div style={{ padding: 12 }}>
        {!isAuthenticated && (
          <>
            <p>Log in or create an account to start tracking your visits!</p>
            <button
              className="invisible-button"
              type="button"
              onClick={loginWithRedirect}
            >
              <RiAccountCircleFill />
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
    </IconContext.Provider>
  );
};

export default Login;
