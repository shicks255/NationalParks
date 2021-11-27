/* eslint-disable max-len */
import React, { FC, useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth0 } from '@auth0/auth0-react';
import { UserVisit } from '../Models/UserVisit';
import Park from './Park/Park';
import { getParks, getUserVisits } from '../ParksApi';
import { ParkLocation } from '../Models/Location';

interface IProps {
  filters: { [key: string]: boolean };
}

const Map: FC<IProps> = (props: IProps) => {
  const { filters } = props;
  // const [user, setUser] = useState<User | undefined>(undefined);
  const [userVisits, setUserVisits] = useState<UserVisit[]>();
  const [parks, setParks] = useState<ParkLocation[]>();
  const { loginWithRedirect, user } = useAuth0();
  const LoginButton = () => (
    <button type="button" onClick={() => loginWithRedirect()}>
      Login
    </button>
  );

  const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
      <button
        type="button"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Logout
      </button>
    );
  };

  const userAuthenticated = useAuth0().isAuthenticated;

  useEffect(() => {
    if (user) {
      getUserVisits(user?.sub?.slice(6) ?? '').then((res) => {
        setUserVisits(res);
      });
    }
  }, [user]);

  useEffect(() => {
    getParks().then((res) => {
      setParks(res);
    });
  }, []);

  if (!parks) {
    return <div> Loading : ) </div>;
  }

  const filteredParks = parks.filter((pa) => filters[pa.type]);

  let parkVisitMap: Record<number, UserVisit> = {};

  if (userVisits) {
    parkVisitMap = userVisits.reduce<Record<number, UserVisit>>((pre, curr) => {
      // eslint-disable-next-line no-param-reassign
      pre[curr.parkId] = curr;
      return pre;
    }, {});
  }

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
            attribution="Map tiles by <a href=http://stamen.com>StamenDesign</a>, under <a href=http://creativecommons.org/licenses/by/3.0>CC BY 3.0</a>. Data by <a href=http://openstreetmap.org>OpenStreetMap</a>, under <a href=http://www.openstreetmap.org/copyright>ODbL</a>."
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
          />
          {/* <TileLayer */}
          {/*  attribution="&copy; <a href=http://osm.org/copyright>
          OpenStreetMap</a> contributors" */}
          {/*  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" */}
          {/* /> */}

          {filteredParks.map((loc) => (
            <Park key={loc.id} park={loc} userVisit={parkVisitMap[loc.id]} />
          ))}
        </MapContainer>
      </div>
      <div>
        {false && !userAuthenticated && (
          <>
            <p>Log in or create an account to start tracking your visits!</p>
            <LoginButton />
          </>
        )}
        {false && userAuthenticated && <LogoutButton />}
      </div>
    </div>
  );
};

export default Map;
