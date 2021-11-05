import React, { FC } from 'react';
import { Marker, Polygon, Popup } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import { ParkLocation } from '../Models/Location';

interface IProps {
  park: ParkLocation;
}

const Park: FC<IProps> = ({
  park: { id, coords, name, rating, yourComment, yourVisit, outline },
}: IProps) => {
  const ic = L.icon({
    iconUrl: icon,
    iconSize: [15, 25],
    // iconAnchor: [0, 35],
  });
  // const { park.id, park.coords, park.name, park.rating, park.yourComment, park.yourVisit, park.outline } =
  //   park;
  return (
    <>
      <Marker key={id} position={coords} icon={ic}>
        <Popup>
          <div>
            <b>{name}</b>
            <br />
            Avg Rating {rating}
            <br />
            <i>{yourComment}</i>
            <br />
            You visited: {yourVisit}
          </div>
        </Popup>
      </Marker>
      <Polygon positions={outline} />
    </>
  );
};

export default Park;
