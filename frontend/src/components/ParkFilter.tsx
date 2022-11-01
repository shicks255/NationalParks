/* eslint-disable no-param-reassign */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { parkTypes } from '../Constants';
import { ParkLocation } from '../Models/Location';
import useAnalytics from '../hooks/useAnalytics';
import uiStore from '../stores/UIStore';

interface IProps {
  parks: ParkLocation[];
}

const ParkFilter: React.FC<IProps> = observer((props: IProps) => {
  const { parks } = props;
  const { filters } = uiStore;
  const parkTypeCountsMap = parks.reduce<Record<string, number>>(
    (prev, curr) => {
      if (prev[curr.type]) {
        prev[curr.type] += 1;
      } else {
        prev[curr.type] = 1;
      }
      return prev;
    },
    {}
  );

  const { sendCheckAll, sendUncheckAll, sendParkTypeShow, sendParkTypeHide } =
    useAnalytics();

  const selectAll: () => void = () => {
    sendCheckAll();
    uiStore.toggleAllFilters();
  };

  const selectNone: () => void = () => {
    sendUncheckAll();
    uiStore.toggleNoFilters();
  };

  const toggle: (parkType: string) => void = (parkType) => {
    if (filters[parkType]) {
      sendParkTypeHide(parkType);
    } else {
      sendParkTypeShow(parkType);
    }
    uiStore.toggleFilter(parkType);
  };

  const makeRow: (arg: string[]) => JSX.Element = (location) => {
    const parkType = location[0];
    const parkTypeName = location[1];
    return (
      <tr key={parkType}>
        <td colSpan={2}>
          <div className="align-left tab-cell">
            <label htmlFor={parkType}>
              <input
                key={parkType}
                onChange={() => toggle(parkType)}
                checked={filters[parkType]}
                id={parkType}
                type="checkbox"
                className="checkbox"
              />
              {parkTypeName} <i>({parkTypeCountsMap[parkType]})</i>
            </label>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <table className="filter-table">
        <tbody>
          <tr>
            <td className="option-label">Park Types</td>
          </tr>
          <tr>
            <td>
              <button type="button" onClick={selectAll}>
                Check All
              </button>
            </td>
            <td>
              <button type="button" onClick={selectNone}>
                Uncheck All
              </button>
            </td>
          </tr>
          <tr>
            <td className="left-space filter-type" colSpan={2}>
              <img
                className="filter-image"
                height={18}
                src="/nps-logo.png"
                alt=""
              />
              <h2>The Top Dogs</h2>
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) => ['PARK', 'MON', 'NMEM'].includes(item[0]))
            .map((item) => makeRow(item))}
          <tr>
            <td className="left-space filter-type" colSpan={2}>
              <img
                className="filter-image"
                height={18}
                src="/books.png"
                alt=""
              />
              <h2>History</h2>
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) => ['HPARK', 'HSITE', 'HTRAIL'].includes(item[0]))
            .map((item) => makeRow(item))}
          <tr>
            <td className="left-space filter-type" colSpan={2}>
              <img
                className="filter-image"
                height={18}
                src="/cross-swords.png"
                alt=""
              />
              <h2>Military</h2>
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) => ['BFIELD', 'PFIELD', 'MPARK'].includes(item[0]))
            .map((item) => makeRow(item))}
          <tr>
            <td className="left-space filter-type" colSpan={2}>
              <img
                className="filter-image"
                height={18}
                src="/water.png"
                alt=""
              />
              <h2>Waterways</h2>
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) =>
              ['RIVER', 'RRIVER', 'SRIVER', 'SEA', 'LAKE'].includes(item[0])
            )
            .map((item) => makeRow(item))}
          <tr>
            <td className="left-space filter-type" colSpan={2}>
              <img
                className="filter-image"
                height={18}
                src="/park-6-256.png"
                alt=""
              />
              <h2>Land</h2>
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) =>
              [
                'PRE',
                'RECR',
                'RES',
                'PRKWY',
                'MPRKWAY',
                'TRAIL',
                'STRAIL',
              ].includes(item[0])
            )
            .map((item) => makeRow(item))}
        </tbody>
      </table>
    </>
  );
});

export default ParkFilter;
