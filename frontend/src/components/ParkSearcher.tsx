import { observer } from 'mobx-react-lite';
import React from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { IconContext } from 'react-icons/lib/esm/iconContext';
import { ParkLocation } from '../Models/Location';
import uiStore from '../stores/UIStore';

interface IProps {
  parks: ParkLocation[];
}

const ParkSearcher: React.FC<IProps> = observer(({ parks }: IProps) => {
  const { parkSearch, selectedPark, searchTextFocused } = uiStore;

  const searchFilterParks = parks
    .filter((pa) => pa.name.toLowerCase().includes(parkSearch.toLowerCase()))
    .sort((a, b) => {
      if (a.name > b.name) return 1;
      return -1;
    });

  const handleFocus = () => {
    uiStore.searchTextFocused = true;
  };

  return (
    <>
      <IconContext.Provider value={{ size: '2em' }}>
        <div className="park-search">
          <div className="search-icon">
            <FaSearchLocation />
          </div>
          <input
            disabled={!!selectedPark}
            value={uiStore.inputDisplay}
            onChange={(e) => {
              uiStore.parkSearch = e.currentTarget.value;
            }}
            placeholder="Search for a park"
            onFocus={() => handleFocus()}
          />
          <div className="park-search-results">
            {parkSearch && parkSearch.length > 1 && searchTextFocused && (
              <table>
                <tbody>
                  {searchFilterParks.slice(0, 5).map((loc) => (
                    <tr
                      key={loc.code}
                      onClick={() => {
                        uiStore.updateFlyToPark(loc);
                        uiStore.updateSelectedPark(loc);
                        uiStore.searchTextFocused = false;
                      }}
                    >
                      <td>
                        <span>{loc.name}</span>
                      </td>
                    </tr>
                  ))}
                  {searchFilterParks.length > 5 && (
                    <tr className="non-hover">
                      <td>...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          {uiStore.inputDisplay && uiStore.inputDisplay.length > 0 && (
            <div className="x">
              <GrClose
                onClick={() => {
                  uiStore.updateSelectedPark(undefined);
                  uiStore.parkSearch = '';
                }}
              />
            </div>
          )}
        </div>
        ;
      </IconContext.Provider>
    </>
  );
});

export default ParkSearcher;
