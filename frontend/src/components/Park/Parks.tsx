import React, { FC, useState } from 'react';
import { useMapEvents, useMap } from 'react-leaflet';
import { observer } from 'mobx-react-lite';
import Park from './Park';
import { UserVisit } from '../../Models/UserVisit';
import { ParkLocation } from '../../Models/Location';

interface IProps {
  parkVisitMap: Record<string, UserVisit>;
  filteredParks: ParkLocation[];
}

const Parks: FC<IProps> = observer((props: IProps) => {
  const { parkVisitMap, filteredParks } = props;
  const [zoomLevel, setZoomLevel] = useState(5);

  const mapevents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapevents.getZoom());
    },
  });

  /**
   * To stop the weird screen jumping issue when using zoom control
   */
  const map = useMap();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  map.getContainer().focus = () => {};

  return (
    <div>
      {filteredParks.map((loc) => (
        <Park
          showOutline={zoomLevel > 7}
          key={loc.code}
          park={loc}
          userVisit={parkVisitMap[loc.code]}
        />
      ))}
    </div>
  );
});

export default Parks;
