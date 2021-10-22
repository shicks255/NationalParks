import React from 'react';
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet';
import { LocationType, ParkLocation, State } from './Models/Location';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Map() {
  const ic = L.icon({
    iconUrl: icon,
    iconSize: [15, 25],
    // iconAnchor: [0, 35],
  });

  const parkTypes = [
    'National Park',
    'National Monument',
    'National Preserve',
    'National Historic Park',
    'National Historic Site',
    'National Battlefield',
    'National Military Park',
    'National Recreation Area',
    'National River',
    'National Reserve',
    'National Parkway',
    'National Parkway',
    'National Trail',
  ];

  const states = [
    'AL',
    'AK',
    'AR',
    'AZ',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KA',
    'KY',
    'LA',
    'MA',
    'MD',
    'ME',
    'MI',
    'MO',
    'MN',
    'MT',
    'NC',
    'NE',
    'ND',
    'NH',
    'NJ',
    'NN',
    'NV',
    'NY',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TX',
    'TN',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  const locations = [];
  locations.push(
    new ParkLocation({
      name: 'Zion National Park',
      state: {
        name: 'Utah',
        abv: State.AZ,
      },
      type: LocationType.National_Park,
      coords: [37.318099, -113.029996],
      outline: [
        [37.165515, -112.86738],
        [37.248368, -112.86738],
        [37.248368, -112.86738],
      ],
    })
  );

  console.log(locations);

  return (
    <div>
      <div
        className="leaflet-container"
        style={{ width: '75%', display: 'inline-block' }}
      >
        <MapContainer
          center={[41.878, -87.629]}
          zoom={5}
          style={{ height: '100vh' }}
        >
          {/* <TileLayer */}
          {/*  attribution="Map tiles by <a href=http://stamen.com>Stamen Design</a>, under <a href=http://creativecommons.org/licenses/by/3.0>CC BY 3.0</a>. Data by <a href=http://openstreetmap.org>OpenStreetMap</a>, under <a href=http://www.openstreetmap.org/copyright>ODbL</a>." */}
          {/*  url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png" */}
          {/* /> */}
          <TileLayer
            attribution="&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((loc) => (
            <>
              <Marker key={loc.name} position={loc.coords} icon={ic}>
                <Popup>{loc.name}</Popup>
              </Marker>
              <Polygon positions={loc.outline} />
            </>
          ))}
        </MapContainer>
      </div>
      <div style={{ width: '25%', display: 'inline-block' }}>
        <div>Hide</div>
        <table>
          <tbody>
            <tr>
              <td>Park Types</td>
            </tr>
            {parkTypes.map((ty) => (
              <tr>
                <td>
                  <label htmlFor={ty}>
                    <input id={ty} type="checkbox" />
                    {ty}
                  </label>
                </td>
              </tr>
            ))}
            <tr>
              <td>In State</td>
            </tr>
            <tr>
              <td>
                <select>
                  {states.map((state) => (
                    <option>{state}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
