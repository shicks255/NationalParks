/* eslint-disable max-len */
import React, { FC, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { UserVisit } from '../Models/UserVisit';
import Parks from './Park/Parks';
import { ParkLocation } from '../Models/Location';
import ParkSearch from './ParkSearch';

interface IProps {
  filters: { [key: string]: boolean };
  parks: ParkLocation[];
  userVisits: UserVisit[] | undefined;
}

const Map: FC<IProps> = (props: IProps) => {
  const { filters, parks, userVisits } = props;
  const [searchPark, setSearchPark] = useState('');
  const [searchTextFocused, setSearchTextFocused] = useState(false);
  const [flyToPark, setFlyToPark] = useState<ParkLocation | null>(null);

  const filteredParks = parks.filter((pa) => filters[pa.type]);

  let parkVisitMap: Record<number, UserVisit> = {};

  if (userVisits) {
    parkVisitMap = userVisits.reduce<Record<string, UserVisit>>((pre, curr) => {
      // eslint-disable-next-line no-param-reassign
      pre[curr.parkId] = curr;
      return pre;
    }, {});
  }

  return (
    <div>
      <div className="map-header">National Parks Visiting Tool</div>
      <div>
        <div className="park-search">
          Search for Park:
          <input
            value={searchPark}
            onChange={(e) => {
              setSearchPark(e.currentTarget.value);
            }}
            onFocus={() => setSearchTextFocused(true)}
            onBlur={() => setTimeout(() => setSearchTextFocused(false), 250)}
          />
          <div className="park-search-results">
            {searchPark && searchPark.length > 2 && searchTextFocused && (
              <table>
                {parks
                  .filter((loc) =>
                    loc.name.toLowerCase().includes(searchPark.toLowerCase())
                  )
                  .map((loc) => (
                    <tr onClick={() => setFlyToPark(loc)}>{loc.name}</tr>
                  ))}
              </table>
            )}
          </div>
          {searchPark && searchPark.length > 0 && (
            <div className="x">
              <button
                type="button"
                onClick={() => {
                  setSearchPark('');
                }}
              >
                X
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="leaflet-container">
        <MapContainer
          maxZoom={13}
          minZoom={3}
          center={[37.878, -98.629]}
          zoom={4}
          style={{ height: '100vh' }}
          zoomControl={false}
        >
          <ParkSearch park={flyToPark} setFlyToPark={setFlyToPark} />
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
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
