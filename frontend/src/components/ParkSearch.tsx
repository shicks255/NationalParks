import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { ParkLocation } from '../Models/Location';
import uiStore from '../stores/UIStore';

const ParkSearch = observer(() => {
  const { selectedPark } = uiStore;
  const map = useMap();

  useEffect(() => {
    function fly(parc: ParkLocation) {
      map.flyTo([parc.latitude, parc.longitude], 11);
    }

    if (selectedPark) {
      fly(selectedPark);
    }
  }, [selectedPark, map]);

  return <></>;
});

export default ParkSearch;
