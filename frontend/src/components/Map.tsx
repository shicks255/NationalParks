import React from 'react';
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationType, ParkLocation, State } from '../Models/Location';
import { User } from '../Models/User';
import { IUserVisit, UserVisit } from '../Models/UserVisit';
import Park from './Park';
import ParkFilter from './ParkFilter';
import EditVisit from './EditVisit';
import { getParks, getUser, getUserVisits } from '../ParksApi';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Map() {
  const user = getUser();
  const userVisits = getUserVisits();
  const locations = getParks();

  const parkVisitMap = userVisits.reduce<Record<number, UserVisit>>(
    (pre, curr) => {
      // eslint-disable-next-line no-param-reassign
      pre[curr.parkId] = curr;

      return pre;
    },
    {}
  );

  return (
    <div>
      <div>National Parks Visiting Tool</div>
      <div
        className="leaflet-container"
        // style={{ width: '70%', display: 'inline-block' }}
      >
        <MapContainer
          center={[41.878, -87.629]}
          zoom={5}
          style={{ height: '80vh' }}
        >
          <TileLayer
            attribution="Map tiles by <a href=http://stamen.com>Stamen Design</a>, under <a href=http://creativecommons.org/licenses/by/3.0>CC BY 3.0</a>. Data by <a href=http://openstreetmap.org>OpenStreetMap</a>, under <a href=http://www.openstreetmap.org/copyright>ODbL</a>."
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
          />
          {/* <TileLayer */}
          {/*  attribution="&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors" */}
          {/*  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" */}
          {/* /> */}

          {locations.map((loc) => (
            <Park key={loc.id} park={loc} />
          ))}
        </MapContainer>
      </div>
      <div>
        {/* noneLoggedInUserVisit */}
        <p>Log in or create an account to start tracking your visits!</p>
      </div>
    </div>
  );
}
