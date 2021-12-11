import React, { FC, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import Park from './Park';
import { UserVisit } from '../../Models/UserVisit';
import { ParkLocation } from '../../Models/Location';

interface IProps {
  parkVisitMap: Record<number, UserVisit>;
  filteredParks: ParkLocation[];
}

const Parks: FC<IProps> = (props: IProps) => {
  const { parkVisitMap, filteredParks } = props;
  const [zoomLevel, setZoomLevel] = useState(5);

  const mapevents = useMapEvents({
    zoom: () => {
      setZoomLevel(mapevents.getZoom());
    },
  });

  return (
    <div>
      {filteredParks.map((loc) => (
        <Park
          showOutline={zoomLevel > 7}
          key={loc.id}
          park={loc}
          userVisit={parkVisitMap[loc.id]}
        />
      ))}
    </div>
  );
};

export default Parks;
