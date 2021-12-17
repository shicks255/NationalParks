import React, { Dispatch, FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { ParkLocation } from '../Models/Location';

interface IProps {
  park: ParkLocation | null;
  setFlyToPark: Dispatch<React.SetStateAction<ParkLocation | null>>;
}

const ParkSearch: FC<IProps> = (props) => {
  const { park, setFlyToPark } = props;
  const map = useMap();

  useEffect(() => {
    function fly(parc: ParkLocation) {
      map.flyTo([parc.latitude, parc.longitude], 11);
      setFlyToPark(null);
    }

    if (park) {
      fly(park);
    }
  }, [park]);

  return <></>;
};

export default ParkSearch;
