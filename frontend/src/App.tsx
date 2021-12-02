import React, { useCallback, useReducer, useState, FC } from 'react';
import './App.css';
// import { useAuth0 } from '@auth0/auth0-react';
import Map from './components/Map';
import ParkFilter from './components/ParkFilter';
import EditVisit from './components/Park/EditVisit';
import { parkTypes } from './Constants';

const App: FC = () => {
  const [expandedMenu, setExpandedMenu] = useState(false);
  // const { handleRedirectCallback } = useAuth0();

  let hamburgerClass = 'hamburger';
  let shelfClass = 'shelf-container';
  if (expandedMenu) {
    hamburgerClass += ' active';
    shelfClass += ' active';
  }

  function toggleBurger(): void {
    setExpandedMenu(!expandedMenu);
  }

  const defaultFilters: { [key: string]: boolean } = {};

  Object.entries(parkTypes).forEach((ty) => {
    defaultFilters[ty[0]] = true;
  });

  function reducer(
    state: { [key: string]: boolean },
    action: { [key: string]: boolean }
  ): { [key: string]: boolean } {
    return {
      ...state,
      ...action,
    };
  }

  const [filters, dispatch] = useReducer(reducer, defaultFilters);

  const toggleFilter = useCallback(
    (parkType: string) => {
      const shown = filters[parkType];
      const mergingState: { [key: string]: boolean } = {};
      mergingState[parkType] = !shown;
      dispatch(mergingState);
    },
    [filters]
  );

  return (
    <div className="App">
      <div className={shelfClass}>
        <div className="shelf-content">
          <EditVisit />
          <ParkFilter filters={filters} toggleFunc={toggleFilter} />
        </div>
      </div>
      <header className="header">
        <nav className="navbar">
          <a href="#/" className="nav-logo">
            Nat Parks
          </a>
          <div className={hamburgerClass}>
            <button type="button" onClick={toggleBurger}>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </nav>
      </header>

      <div className="map-box">
        <div className="map-container">
          <Map filters={filters} />
          &copy;<a href="https://shicks255.com">Steven M Hicks</a>
        </div>
      </div>
    </div>
  );
};

export default App;
