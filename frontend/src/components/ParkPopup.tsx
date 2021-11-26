import React, { FC, useState } from 'react';
import { Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { useAuth0 } from '@auth0/auth0-react';
import { ParkLocation } from '../Models/Location';
import { UserVisit } from '../Models/UserVisit';
import { saveUserVisit } from '../ParksApi';
import CollapsibleBox from './CollapsibleBox';
import HoursDetails, { IOperatingHours } from './HoursDetails';
import FeesDetails, { IEntranceFee } from './FeesDetails';
import ImageDetails from './ImageDetails';

interface IProps {
  park: ParkLocation;
  userVisit?: UserVisit | undefined;
  details: IDetails | undefined;
}

interface IDetails {
  activities: IActivity[];
  addresses: IAddress[];
  contacts: IContacts;
  description: string;
  designation: string;
  directionsInfo: string;
  directionsUrl: string;
  entranceFees: IEntranceFee[];
  // fees: d;
  fullName: string;
  id: string;
  images: IParkImage[];
  latLong: string;
  latitude: string;
  longitude: string;
  operatingHours: IOperatingHours[];
  parkCode: string;
  states: string;
  topics: ITopic[];
  url: string;
  weatherInfo: string;
}

interface IActivity {
  id: string;
  name: string;
}

interface IAddress {
  city: string;
  line1: string;
  line2: string;
  line3: string;
  postalCode: string;
  stateCode: string;
  type: string;
}

interface IContacts {
  emailAddress: IEmailAddress[];
  phoneNumbers: IPhoneNumber[];
}

interface IEmailAddress {
  description: string;
  emailAddress: string;
}

interface IPhoneNumber {
  description: string;
  extension: string;
  phoneNumber: string;
}

interface IParkImage {
  altText: string;
  caption: string;
  credit: string;
  title: string;
  url: string;
}

interface ITopic {
  id: string;
  name: string;
}

const Park: FC<IProps> = ({ park, userVisit, details }: IProps) => {
  // const ic = L.icon({
  //   iconUrl: icon,
  //   iconSize: [15, 25],
  //   iconAnchor: [0, 35],
  // });

  const { id, name, latitude, longitude } = park;
  const { rating, comment, visited } = userVisit ?? {
    rating: '',
    comment: '',
    visited: '',
  };

  const { user } = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  const [newRating, setNewRating] = useState(rating);
  const [newComment, setNewComment] = useState(comment);
  const [newVisitDate, setNewVisitDate] = useState(visited);

  // const getDetails = useCallback(() => {
  //   console.log('getting details');
  //   if (code) {
  //     const parxData = getParkInfo(code);
  //     console.log(parxData);
  //     getParkInfo(code).then((data) => {
  //       console.log(data);
  //       // setParkInfo(data);
  //     });
  //   }
  // }, []);

  function saveVisit() {
    const newUserVisit: UserVisit = {
      userId: user?.sub?.slice(6) ?? '',
      parkId: id,
      rating: newRating,
      visited: newVisitDate,
      comment: newComment,
    };

    saveUserVisit(newUserVisit);
  }

  const coords: LatLngTuple = [latitude, longitude];

  return (
    <>
      {isEditing ? (
        <Popup>
          <div>
            {coords}
            <b>{name}</b>
            <form>
              <fieldset>
                <label htmlFor="rating">
                  <p>Rating</p>
                  <input
                    name="rating"
                    id="rating"
                    value={newRating}
                    onChange={(e) => {
                      setNewRating(e.target.value);
                    }}
                  />
                </label>
                <label htmlFor="comment">
                  <p>Comment</p>
                  <input
                    name="comment"
                    id="comment"
                    value={newComment}
                    onChange={(e) => {
                      setNewComment(e.target.value);
                    }}
                  />
                </label>
                <label htmlFor="visit">
                  <p>Your Visit</p>
                  <input
                    name="visit"
                    id="visit"
                    value={newVisitDate}
                    onChange={(e) => setNewVisitDate(e.target.value)}
                  />
                </label>
              </fieldset>
              <button type="button" onClick={saveVisit}>
                Update
              </button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          </div>
        </Popup>
      ) : (
        // eslint-disable-next-line react/jsx-no-bind
        <Popup>
          <div style={{ maxHeight: 250, overflowY: 'scroll' }}>
            {user && (
              <button type="button" onClick={() => setIsEditing(!isEditing)}>
                Edit
              </button>
            )}
            <b>
              {name}
              {details && (
                <a href={details.url} target="_blank" rel="noreferrer">
                  &amp;
                </a>
              )}
            </b>
            <br />
            <blockquote>{details && details.description}</blockquote>
            <br />
            {details && (
              <CollapsibleBox title="Hours">
                <HoursDetails details={details.operatingHours} />
              </CollapsibleBox>
            )}
            <br />
            {details && (
              <CollapsibleBox title="Weather">
                {details.weatherInfo}
              </CollapsibleBox>
            )}
            <br />
            {details && (
              <CollapsibleBox title="Cost">
                <FeesDetails fees={details.entranceFees} />
              </CollapsibleBox>
            )}
            <br />
            {details && <ImageDetails images={details?.images} />}
            Avg Rating {rating}
            <br />
            {user && (
              <>
                <br />
                You visited: {visited}
                <br />
                Your Comment:
                <i>{comment}</i>
              </>
            )}
          </div>
        </Popup>
      )}
    </>
  );
};

Park.defaultProps = {
  userVisit: {
    userId: '',
    parkId: 0,
    rating: '',
    comment: '',
    visited: '',
  },
};

export type { IDetails, IParkImage };
export default Park;
