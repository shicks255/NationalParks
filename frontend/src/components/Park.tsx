import React, { FC, useEffect, useMemo, useState } from 'react';
import { Marker, Polygon, Popup } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import { useAuth0 } from '@auth0/auth0-react';
import { ParkLocation } from '../Models/Location';
import { UserVisit } from '../Models/UserVisit';
import { saveUserVisit, getParkInfo } from '../ParksApi';
import ParkPopup, { IDetails } from './ParkPopup';

interface IProps {
  park: ParkLocation;
  userVisit?: UserVisit | undefined;
}

const Park: FC<IProps> = ({ park, userVisit }: IProps) => {
  const ic = L.icon({
    iconUrl: icon,
    iconSize: [15, 25],
    // iconAnchor: [0, 35],
  });

  const [parkDetails, setParkDetails] = useState<IDetails | undefined>(
    undefined
  );

  const { id, latitude, longitude, outline, code } = park;
  const coords: LatLngTuple = [latitude, longitude];

  function getDetails() {
    if (code) {
      const parxData = getParkInfo(code).then((data) => {
        console.log(data);
        setParkDetails(data);
      });
    }
  }

  return (
    <>
      <Marker
        key={id}
        position={coords}
        icon={ic}
        eventHandlers={{
          click: () => {
            getDetails();
          },
        }}
      >
        <ParkPopup park={park} userVisit={userVisit} details={parkDetails} />
      </Marker>
      {outline && <Polygon positions={outline} />}
    </>
  );
};

Park.defaultProps = {
  userVisit: {
    userId: '',
    parkId: 0,
    rating: '',
    comment: '',
    visited: '',
  },
};

export default Park;
