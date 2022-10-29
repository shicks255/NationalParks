import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { ParkLocation } from '../Models/Location';
import uiStore from '../stores/UIStore';

const ParkSearch = observer(() => {
  const { flyToPark } = uiStore;
  const map = useMap();

  useEffect(() => {
    function fly(parc: ParkLocation) {
      map.flyTo([parc.latitude, parc.longitude], 11);
      uiStore.updateFlyToPark(undefined);
    }

    if (flyToPark) {
      fly(flyToPark);
    }
  }, [flyToPark, map]);

  return <></>;
});

export default ParkSearch;
