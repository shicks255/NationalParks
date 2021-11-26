import React, { FC, useState } from 'react';
import { Marker, Polygon } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import { ParkLocation } from '../Models/Location';
import { UserVisit } from '../Models/UserVisit';
import { getParkInfo } from '../ParksApi';
import ParkPopup, { IDetails } from './ParkPopup';
import useAnalytics from '../hooks/useAnalytics';

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

  const { sendParkClick } = useAnalytics();

  const [parkDetails, setParkDetails] = useState<IDetails | undefined>(
    undefined
  );

  const { id, latitude, longitude, outline, code } = park;
  const coords: LatLngTuple = [latitude, longitude];

  function getDetails() {
    if (code) {
      sendParkClick(code);
      getParkInfo(code).then((data) => {
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
