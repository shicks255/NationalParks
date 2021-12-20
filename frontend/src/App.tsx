import React, {
  useCallback,
  useReducer,
  useState,
  FC,
  useEffect,
  useRef,
} from 'react';
import './App.css';
// import { useAuth0 } from '@auth0/auth0-react';
import Map from './components/Map';
import ParkFilter from './components/ParkFilter';
import EditVisit from './components/Park/EditVisit';
import { parkTypes } from './Constants';
import { getParks } from './ParksApi';
import { ParkLocation } from './Models/Location';
import useClickOutside from './hooks/useClickOutside';

const App: FC = () => {
  const [expandedMenu, setExpandedMenu] = useState(false);
  const [parks, setParks] = useState<ParkLocation[]>();

  // const { handleRedirectCallback } = useAuth0();

  useEffect(() => {
    getParks().then((res) => {
      setParks(res);
    });
  }, []);

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

  const toggleAll = () => {
    const mergingState: { [key: string]: boolean } = {};
    Object.keys(parkTypes).forEach((key) => {
      mergingState[key] = true;
    });
    dispatch(mergingState);
  };

  const toggleNon = () => {
    const mergingState: { [key: string]: boolean } = {};
    Object.keys(parkTypes).forEach((key) => {
      mergingState[key] = false;
    });
    dispatch(mergingState);
  };

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    setExpandedMenu(false);
  });

  if (!parks) {
    return <div> Loading : ) </div>;
  }

  return (
    <div className="App">
      <header className="header">
        <nav className="navbar">
          <a href="#/" className="nav-logo">
            Nat Parks
          </a>
        </nav>
      </header>
      <div ref={ref}>
        <div className={hamburgerClass}>
          <button type="button" onClick={toggleBurger}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
        <div className={shelfClass}>
          <div className="shelf-content">
            <EditVisit />
            <ParkFilter
              filters={filters}
              toggleFunc={toggleFilter}
              toggleAll={toggleAll}
              toggleNon={toggleNon}
              parks={parks}
            />
          </div>
        </div>
      </div>
      <Map filters={filters} parks={parks} />
      <div className="copyright-container">
        &copy;<a href="https://shicks255.com">Steven M Hicks</a>
      </div>
    </div>
  );
};

export default App;
