import React, { FC, useState } from 'react';
import { Marker, Polygon } from 'react-leaflet';
import L, { LatLngTuple, PointTuple } from 'leaflet';
import { ParkLocation } from '../../Models/Location';
import { UserVisit } from '../../Models/UserVisit';
import { getParkInfo } from '../../ParksApi';
import ParkPopup, { IDetails } from './ParkPopup';
import useAnalytics from '../../hooks/useAnalytics';

interface IProps {
  park: ParkLocation;
  userVisit?: UserVisit | undefined;
  showOutline: boolean;
}

interface MyIcon {
  url: string;
  heightWidth: number[];
}

const getIcon: (park: ParkLocation) => MyIcon = (park) => {
  let iconUrl = '';
  const dimension: number[] = [];
  if (['PARK', 'MON', 'NMEM'].includes(park.type.toString())) {
    iconUrl = '/nps-logo.png';
    dimension.push(20, 25);
  }
  if (['HPARK', 'HSITE', 'HTRAIL'].includes(park.type.toString())) {
    iconUrl = '/books.png';
    dimension.push(20, 25);
  }
  if (['BFIELD', 'PFIELD', 'MPARK'].includes(park.type.toString())) {
    iconUrl = '/cross-swords.png';
    dimension.push(20, 25);
  }
  if (
    ['RIVER', 'RRIVER', 'SRIVER', 'SEA', 'LAKE'].includes(park.type.toString())
  ) {
    iconUrl = '/water.png';
    dimension.push(25, 25);
  }
  if (
    ['PRE', 'RECR', 'RES', 'PRKWY', 'MPRKWAY', 'TRAIL', 'STRAIL'].includes(
      park.type.toString()
    )
  ) {
    iconUrl = '/park-6-256.png';
    dimension.push(25, 30);
  }

  return {
    url: iconUrl,
    heightWidth: dimension,
  };
};

const Park: FC<IProps> = ({ park, userVisit, showOutline }: IProps) => {
  const iconAndDimension = getIcon(park);
  const ic = L.icon({
    iconUrl: iconAndDimension.url,
    iconSize: iconAndDimension.heightWidth as PointTuple,
    // iconAnchor: [0, 35],
  });
  const { id, latitude, longitude, outline, code } = park;
  const coords: LatLngTuple = [latitude, longitude];

  const { sendParkClick2 } = useAnalytics();

  const [parkDetails, setParkDetails] = useState<IDetails | undefined>(
    undefined
  );

  function getDetails() {
    if (code) {
      sendParkClick2(code);
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
      {outline && showOutline && (
        <div className="outline">
          <Polygon positions={outline} />
        </div>
      )}
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
