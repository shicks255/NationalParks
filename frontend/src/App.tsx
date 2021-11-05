/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useReducer, useState } from 'react';
import './App.css';
import Map from './components/Map';
import ParkFilter from './components/ParkFilter';
import EditVisit from './components/EditVisit';
import { parkTypes } from './Constants';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  const [expandedMenu, setExpandedMenu] = useState(false);

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
    defaultFilters[ty[0]] = false;
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

  function toggleFilter(parkType: string): void {
    const hidden = filters[parkType];
    const mergingState: { [key: string]: boolean } = {};
    mergingState[parkType] = !hidden;
    dispatch(mergingState);
  }

  return (
    <div className="App">
      <div className={shelfClass}>
        <div className="shelf-content">
          {/* <EditVisit /> */}
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <ParkFilter filters={filters} toggleFunc={toggleFilter} />
        </div>
      </div>
      <header className="header">
        <nav className="navbar">
          <a href="#" className="nav-logo">
            WebDev.
          </a>
          <ul className="nav-menu active">
            {/* <li className="nav-item"> */}
            {/*  <a href="#" className="nav-link"> */}
            {/*    Services */}
            {/*  </a> */}
            {/* </li> */}
            {/* <li className="nav-item"> */}
            {/*  <a href="#" className="nav-link"> */}
            {/*    Blog */}
            {/*  </a> */}
            {/* </li> */}
            {/* <li className="nav-item"> */}
            {/*  <a href="#" className="nav-link"> */}
            {/*    About */}
            {/*  </a> */}
            {/* </li> */}
            {/* <li className="nav-item"> */}
            {/*  <a href="#" className="nav-link"> */}
            {/*    Contact */}
            {/*  </a> */}
            {/* </li> */}
          </ul>
          <div className={hamburgerClass}>
            <button type="button" onClick={toggleBurger}>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </nav>
      </header>

      <div className="map-container">
        <Map />
      </div>
    </div>
  );
}

export default App;
