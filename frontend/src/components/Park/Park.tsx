import React, { FC, useEffect, useRef } from 'react';
import { Marker } from 'react-leaflet';
import L, { LatLngTuple, PointTuple } from 'leaflet';
import { observer } from 'mobx-react-lite';
import { ParkLocation } from '../../Models/Location';
import { UserVisit } from '../../Models/UserVisit';
import useAnalytics from '../../hooks/useAnalytics';
import uiStore from '../../stores/UIStore';

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

const Park: FC<IProps> = observer(({ park }: IProps) => {
  const iconAndDimension = getIcon(park);
  const ic = L.icon({
    iconUrl: iconAndDimension.url,
    iconSize: iconAndDimension.heightWidth as PointTuple,
    // iconAnchor: [0, 35],
  });
  const { id, latitude, longitude, code } = park;
  // const outlineParsed = JSON.parse(outline);
  // let outlineFinal = [];
  // if (outlineParsed) {
  //   outlineFinal = outlineParsed.map((x: number[]) => {
  //     if (x.length > 2) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // return x.map((xx: number[]) => [xx[1], xx[0]]);
  // }
  // return [x[1], x[0]];
  // });
  // }
  const coords: LatLngTuple = [latitude, longitude];

  const { sendParkClick } = useAnalytics();
  const { selectedPark } = uiStore;

  function getDetails() {
    if (code) {
      sendParkClick(code);
    }
  }

  const markerRef = useRef(null);
  useEffect(() => {
    if (markerRef && selectedPark && selectedPark.code === park.code) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      markerRef.current.openPopup();
    }
  }, [park.code, selectedPark]);
  return (
    <>
      <Marker
        ref={markerRef}
        key={id}
        position={coords}
        icon={ic}
        eventHandlers={{
          popupclose: () => {
            uiStore.updateSelectedPark(undefined);
          },
          click: () => {
            uiStore.updateSelectedPark(park);
            getDetails();
          },
        }}
      />
    </>
  );
});

Park.defaultProps = {
  userVisit: {
    userId: '',
    parkId: '',
    rating: '',
    comment: '',
    visited: '',
  },
};

export default Park;
