/* eslint-disable no-param-reassign */
import React from 'react';
import { parkTypes, states } from '../Constants';
import { ParkLocation } from '../Models/Location';

interface IProps {
  filters: { [key: string]: boolean };
  toggleFunc: (e: string) => void;
  parks: ParkLocation[];
}

const ParkFilter: React.FC<IProps> = (props: IProps) => {
  const { filters, toggleFunc, parks } = props;
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

  const makeRow: (arg: string[]) => JSX.Element = (location) => {
    const parkType = location[0];
    const parkTypeName = location[1];
    return (
      <tr key={parkType}>
        <td>
          <label htmlFor={parkType}>
            <input
              key={parkType}
              onChange={() => toggleFunc(parkType)}
              checked={filters[parkType]}
              id={parkType}
              type="checkbox"
            />
            {parkTypeName} <i>({parkTypeCountsMap[parkType]})</i>
          </label>
        </td>
      </tr>
    );
  };

  return (
    <>
      <div>
        <b>Options</b>
      </div>
      <table className="filter-table">
        <tbody>
          <tr>
            <td className="option-label">Park Types</td>
          </tr>
          <tr>
            <td className="left-space filter-type">
              <img
                className="filter-image"
                height={18}
                src="/nps-logo.png"
                alt=""
              />
              The Top Dogs
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) => ['PARK', 'MON', 'NMEM'].includes(item[0]))
            .map((item) => makeRow(item))}
          <tr>
            <td className="left-space filter-type">
              <img
                className="filter-image"
                height={18}
                src="/books.png"
                alt=""
              />
              History
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) => ['HPARK', 'HSITE', 'HTRAIL'].includes(item[0]))
            .map((item) => makeRow(item))}
          <tr>
            <td className="left-space filter-type">
              <img
                className="filter-image"
                height={18}
                src="/cross-swords.png"
                alt=""
              />
              Military
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) => ['BFIELD', 'PFIELD', 'MPARK'].includes(item[0]))
            .map((item) => makeRow(item))}
          <tr>
            <td className="left-space filter-type">
              <img
                className="filter-image"
                height={18}
                src="/water.png"
                alt=""
              />
              Waterways
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) =>
              ['RIVER', 'RRIVER', 'SRIVER', 'SEA', 'LAKE'].includes(item[0])
            )
            .map((item) => makeRow(item))}
          <tr>
            <td className="left-space filter-type">
              <img
                className="filter-image"
                height={18}
                src="/park-6-256.png"
                alt=""
              />
              Land
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
          <tr>
            <td className="left-space filter-type">
              <b>Show</b>
            </td>
          </tr>
          <tr>
            <td>In State</td>
          </tr>
          <tr>
            <td>
              <select>
                {states.map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ParkFilter;
