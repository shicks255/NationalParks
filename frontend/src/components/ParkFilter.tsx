import React from 'react';
import { parkTypes, states } from '../Constants';

interface IProps {
  filters: { [key: string]: boolean };
  toggleFunc: (e: string) => void;
}

const makeRow: (
  arg: string[],
  toggleFunc: (s: string) => void,
  filters: { [key: string]: boolean }
) => JSX.Element = (location, toggleFunc, filters) => (
  <tr key={location[0]}>
    <td>
      <label htmlFor={location[0]}>
        <input
          key={location[0]}
          onChange={() => toggleFunc(location[0])}
          checked={filters[location[0]]}
          id={location[0]}
          type="checkbox"
        />
        {location[1]}
      </label>
    </td>
  </tr>
);

const ParkFilter: React.FC<IProps> = (props: IProps) => {
  const { filters, toggleFunc } = props;
  return (
    <>
      <div>
        <b>Show</b>
      </div>
      <table className="filter-table">
        <tbody>
          <tr>
            <td className="left-space">
              <img height={18} src="/nps-logo.png" alt="" /> Big Ones
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) => ['PARK', 'MON', 'NMEM'].includes(item[0]))
            .map((item) => makeRow(item, toggleFunc, filters))}
          <tr>
            <td className="left-space">
              <img height={18} src="/books.png" alt="" />
              History
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) => ['HPARK', 'HSITE', 'HTRAIL'].includes(item[0]))
            .map((item) => makeRow(item, toggleFunc, filters))}
          <tr>
            <td className="left-space">
              <img height={18} src="/cross-swords.png" alt="" />
              Military
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) => ['BFIELD', 'PFIELD', 'MPARK'].includes(item[0]))
            .map((item) => makeRow(item, toggleFunc, filters))}
          <tr>
            <td className="left-space">
              <img height={18} src="/water.png" alt="" />
              Waterways
            </td>
          </tr>
          {Object.entries(parkTypes)
            .filter((item) =>
              ['RIVER', 'RRIVER', 'SRIVER', 'SEA', 'LAKE'].includes(item[0])
            )
            .map((item) => makeRow(item, toggleFunc, filters))}
          <tr>
            <td className="left-space">
              <img height={18} src="/park-6-256.png" alt="" />
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
            .map((item) => makeRow(item, toggleFunc, filters))}
          <tr>
            <td className="left-space">
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
