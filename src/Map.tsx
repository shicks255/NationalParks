import React from 'react';
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet';
import { LocationType, ParkLocation, State } from './Models/Location';
import { User } from './Models/User';
import { IUserVisit, UserVisit } from './Models/UserVisit';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Map() {
  const ic = L.icon({
    iconUrl: icon,
    iconSize: [15, 25],
    // iconAnchor: [0, 35],
  });

  const parkTypes = [
    'National Park',
    'National Monument',
    'National Preserve',
    'National Historic Park',
    'National Historic Site',
    'National Battlefield',
    'National Military Park',
    'National Recreation Area',
    'National River',
    'National Reserve',
    'National Parkway',
    'National Parkway',
    'National Trail',
  ];

  const states = [
    'AL',
    'AK',
    'AR',
    'AZ',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KA',
    'KY',
    'LA',
    'MA',
    'MD',
    'ME',
    'MI',
    'MO',
    'MN',
    'MT',
    'NC',
    'NE',
    'ND',
    'NH',
    'NJ',
    'NN',
    'NV',
    'NY',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TX',
    'TN',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  const user = new User({
    id: 1,
    username: 'shicks255',
  });

  const userVisits: UserVisit[] = [];
  userVisits.push(
    new UserVisit({
      userId: 1,
      parkId: 1,
      visited: '10/3/2021',
      comment: 'Good Times',
      rating: 4.0,
    })
  );

  const parkVisitMap = userVisits.reduce<Record<number, UserVisit>>(
    (pre, curr) => {
      // eslint-disable-next-line no-param-reassign
      pre[curr.parkId] = curr;

      return pre;
    },
    {}
  );

  console.log(parkVisitMap);

  const locations = [];
  locations.push(
    new ParkLocation({
      id: 1,
      name: 'Zion National Park',
      state: {
        name: 'Utah',
        abv: State.AZ,
      },
      type: LocationType.National_Park,
      coords: [37.318099, -113.029996],
      outline: [
        [37.33631625612842, -113.10836791992188],
        [37.257112607698105, -113.10905456542969],
        [37.2576591253159, -113.11798095703125],
        [37.23470197166817, -113.11798095703125],
        [37.235248651837395, -113.10836791992188],
        [37.1986123165983, -113.1097412109375],
        [37.199159258361455, -113.09120178222656],
        [37.171807316143166, -113.08982849121092],
        [37.17235445206048, -113.01704406738281],
        [37.17782559332976, -113.01773071289062],
        [37.17891977403989, -113.0115509033203],
        [37.18493748465265, -113.01292419433594],
        [37.183296338395685, -113.00743103027344],
        [37.201893907733826, -113.00605773925781],
        [37.201893907733826, -112.9888916015625],
        [37.18384339111027, -112.98614501953125],
        [37.18384339111027, -112.99781799316406],
        [37.17071303242321, -112.99781799316406],
        [37.170165884620566, -113.01086425781249],
        [37.16195819218457, -113.01017761230469],
        [37.16414699732166, -112.96897888183594],
        [37.14116138236253, -112.96897888183594],
        [37.14170874010794, -112.9010009765625],
        [37.15156050223665, -112.89894104003906],
        [37.15265506325517, -112.86186218261719],
        [37.25055408701377, -112.86529541015625],
        [37.25383341872526, -112.884521484375],
        [37.26640286793118, -112.88246154785156],
        [37.267495764381856, -112.90237426757811],
        [37.28279464911045, -112.9010009765625],
        [37.370702880453074, -112.9016876220703],
        [37.37561396938701, -113.00331115722655],
        [37.391981943533544, -113.00056457519531],
        [37.39907362268733, -113.01292419433594],
        [37.397437140899775, -113.03764343261719],
        [37.384344000228964, -113.04656982421875],
        [37.37233994582318, -113.05824279785155],
        [37.37288562634096, -113.09600830078125],
        [37.44488060256697, -113.09463500976562],
        [37.44488060256697, -113.14682006835938],
        [37.50264464701539, -113.148193359375],
        [37.50318937824072, -113.19969177246094],
        [37.47867253877263, -113.19900512695311],
        [37.47812762872122, -113.20724487304688],
        [37.46504859550001, -113.2086181640625],
        [37.46559360090852, -113.22853088378906],
        [37.44978683111484, -113.22853088378906],
        [37.44978683111484, -113.21685791015625],
        [37.400710068740565, -113.21617126464844],
        [37.40016459069333, -113.20381164550781],
        [37.388708634542056, -113.20724487304688],
        [37.38707192644979, -113.19694519042969],
        [37.37233994582318, -113.19557189941406],
        [37.37397697546802, -113.12416076660156],
        [37.35269280367274, -113.12690734863281],
        [37.351601144954785, -113.11798095703125],
        [37.33631625612842, -113.11660766601562],
        [37.33696456235654, -113.1086254119873],
        [37.3356338224747, -113.1082820892334],
      ],
      // outline: [
      //   [37.165515, -112.86738],
      //   [37.248368, -112.86738],
      //   [37.248368, -112.86738],
      // ],
      rating: 2.4,
      yourComment:
        'Went here in Oct 2021.  Was very fun.  Park of the Utah trip with Steph',
      yourVisit: '10/3/2021',
    })
  );

  console.log(locations);

  return (
    <div>
      <div>National Parks Visiting Tool</div>
      <div
        className="leaflet-container"
        style={{ width: '70%', display: 'inline-block' }}
      >
        <MapContainer
          center={[41.878, -87.629]}
          zoom={5}
          style={{ height: '100vh' }}
        >
          <TileLayer
            attribution="Map tiles by <a href=http://stamen.com>Stamen Design</a>, under <a href=http://creativecommons.org/licenses/by/3.0>CC BY 3.0</a>. Data by <a href=http://openstreetmap.org>OpenStreetMap</a>, under <a href=http://www.openstreetmap.org/copyright>ODbL</a>."
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png"
          />
          {/* <TileLayer */}
          {/*  attribution="&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors" */}
          {/*  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" */}
          {/* /> */}

          {locations.map((loc) => (
            <>
              <Marker key={loc.id} position={loc.coords} icon={ic}>
                <Popup>
                  <div>
                    <b>{loc.name}</b>
                    <br />
                    Avg Rating {loc.rating}
                    <br />
                    <i>{loc.yourComment}</i>
                    <br />
                    You visited: {loc.yourVisit}
                  </div>
                </Popup>
              </Marker>
              <Polygon positions={loc.outline} />
            </>
          ))}
        </MapContainer>
      </div>
      <div style={{ width: '25%', display: 'inline-block' }}>
        <div>Hide</div>
        <table>
          <tbody>
            <tr>
              <td>Park Types</td>
            </tr>
            {parkTypes.map((ty) => (
              <tr>
                <td>
                  <label htmlFor={ty}>
                    <input id={ty} type="checkbox" />
                    {ty}
                  </label>
                </td>
              </tr>
            ))}
            <tr>
              <td>In State</td>
            </tr>
            <tr>
              <td>
                <select>
                  {states.map((state) => (
                    <option>{state}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {/* loggedInUserVisit */}
        <form>
          <fieldset>
            <label htmlFor="rating">
              <p>Rating</p>
              <input name="rating" id="rating" />
            </label>
            <label htmlFor="comment">
              <p>Comment</p>
              <input name="comment" id="comment" />
            </label>
            <label htmlFor="visit">
              <p>Your Visit</p>
              <input name="visit" id="visit" />
            </label>
          </fieldset>
          <button type="submit">Update</button>
        </form>
      </div>
      <div>
        {/* noneLoggedInUserVisit */}
        <p>Log in or create an account to start tracking your visits!</p>
      </div>
    </div>
  );
}
