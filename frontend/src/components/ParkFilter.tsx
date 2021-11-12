import React from "react";
import { parkTypes, states } from "../Constants";

interface IProps {
  filters: { [key: string]: boolean };
  toggleFunc: (e: string) => void;
}

const ParkFilter: React.FC<IProps> = (props: IProps) => {
  const { filters, toggleFunc } = props;
  return (
    <>
      <div className="shelf-menu">
        <b>Hide</b>
      </div>
      <table>
        <tbody>
          <tr>
            <td>Park Types</td>
          </tr>
          {Object.entries(parkTypes).map((ty) => (
            <tr key={ty[0]}>
              <td>
                <label htmlFor={ty[0]}>
                  <input
                    key={ty[0]}
                    onChange={() => toggleFunc(ty[0])}
                    checked={filters[ty[0]]}
                    id={ty[0]}
                    type="checkbox"
                  />
                  {ty[1]}
                </label>
              </td>
            </tr>
          ))}
          <tr>
            <td>
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
