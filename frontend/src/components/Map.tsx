/* eslint-disable max-len */
import React, { FC, useRef } from 'react';
import { MapContainer, Polygon, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { observer } from 'mobx-react-lite';
import { UserVisit } from '../Models/UserVisit';
import Parks from './Park/Parks';
import { ParkLocation } from '../Models/Location';
import ParkSearch from './ParkSearch';
import useClickOutside from '../hooks/useClickOutside';
import { useParkOutline } from '../ParksApi';
import ParkSearcher from './ParkSearcher';
import ParkDetailsShelf from './ParkDetailsShelf';
import uiStore from '../stores/UIStore';

interface IProps {
  parks: ParkLocation[];
  userVisits: UserVisit[] | undefined;
}

const Map: FC<IProps> = observer((props: IProps) => {
  const { parks, userVisits } = props;

  const { selectedPark, filters } = uiStore;

  const filteredParks = parks.filter((pa) => filters[pa.type]);

  let parkVisitMap: Record<number, UserVisit> = {};

  if (userVisits) {
    parkVisitMap = userVisits.reduce<Record<string, UserVisit>>((pre, curr) => {
      // eslint-disable-next-line no-param-reassign
      pre[curr.parkId] = curr;
      return pre;
    }, {});
  }

  const parkSearchRef = useRef<HTMLDivElement>(null);
  useClickOutside([parkSearchRef], () => {
    uiStore.searchTextFocused = false;
  });

  const parkOutline = useParkOutline(selectedPark);

  return (
    <div>
      <div className="park-search-box" ref={parkSearchRef}>
        <ParkSearcher parks={parks} />
      </div>
      {selectedPark && <ParkDetailsShelf selectedPark={selectedPark} />}
      <div className={`leaflet-container ${selectedPark ? 'active' : ''}`}>
        <MapContainer
          maxZoom={13}
          minZoom={3}
          center={[37.878, -98.629]}
          zoom={4}
          style={{ height: '100vh' }}
          zoomControl={false}
        >
          <ParkSearch />
          <ZoomControl position="bottomright" />
          {/* <TileLayer */}
          {/*  attribution="Map tiles by <a href=http://stamen.com>StamenDesign</a>, under <a href=http://creativecommons.org/licenses/by/3.0>CC BY 3.0</a>. Data by <a href=http://openstreetmap.org>OpenStreetMap</a>, under <a href=http://www.openstreetmap.org/copyright>ODbL</a>." */}
          {/*  url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png" */}
          {/* /> */}
          <TileLayer
            attribution="&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Parks filteredParks={filteredParks} parkVisitMap={parkVisitMap} />
          {selectedPark && parkOutline && parkOutline.data && (
            <Polygon positions={parkOutline.data} />
          )}
        </MapContainer>
      </div>
    </div>
  );
});

export default Map;
