import React, { FC, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { observer } from 'mobx-react-lite';
import Map from './components/Map';
import ParkFilter from './components/ParkFilter';
import { useParks, useUserVisits } from './ParksApi';
import useClickOutside from './hooks/useClickOutside';
import uiStore from './stores/UIStore';
import Login from './components/login/login';

const App: FC = observer(() => {
  const parks = useParks();

  const { expandedRightShelf } = uiStore;
  const { isAuthenticated, user } = useAuth0();
  const userVisits = useUserVisits(user?.sub?.slice(6) || '', isAuthenticated);

  const buttonRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  useClickOutside([buttonRef, shelfRef], () => {
    uiStore.expandedRightShelf = false;
  });

  if (!parks || parks.isLoading || !parks.data) {
    return <div> Loading : ) </div>;
  }

  return (
    <div className="app">
      <header className="header">
        <nav className="navbar">
          <a href="#/" className="nav-logo">
            Nat Parks
          </a>
        </nav>
        <div
          ref={buttonRef}
          className={`hamburger ${expandedRightShelf ? 'active' : ''}`}
        >
          <button
            type="button"
            onClick={() => {
              uiStore.expandedRightShelf = !uiStore.expandedRightShelf;
            }}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </header>
      <div ref={shelfRef}>
        <div
          className={`right-shelf-container ${
            expandedRightShelf ? 'active' : ''
          }`}
        >
          <div className="right-shelf-content">
            <Login />
            <ParkFilter parks={parks.data} />
          </div>
        </div>
      </div>
      <Map parks={parks.data} userVisits={userVisits.data} />,
      <div className="copyright-container">
        &copy;
        <a target="_blank" href="https://shicks255.com" rel="noreferrer">
          Steven Hicks
        </a>
      </div>
    </div>
  );
});

export default App;
