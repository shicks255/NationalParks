import React, { FC, useState } from 'react';
import { LatLngTuple } from 'leaflet';
import { Popup } from 'react-leaflet';
import { ParkLocation } from '../../Models/Location';
import { UserVisit } from '../../Models/UserVisit';
import HoursDetails, { IOperatingHours } from './HoursDetails';
import FeesDetails, { IEntranceFee } from './FeesDetails';
import EditParkVisit from './EditParkVisit';
import ParkDetails from './ParkDetails';

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
  const { latitude, longitude } = park;
  const { comment, visited } = userVisit ?? {
    rating: '',
    comment: '',
    visited: '',
  };

  const [isEditing, setIsEditing] = useState(false);

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

  const coords: LatLngTuple = [latitude, longitude];

  return (
    <>
      <Popup>
        {isEditing ? (
          <EditParkVisit
            park={park}
            setIsEditing={setIsEditing}
            userVisit={userVisit}
          />
        ) : (
          <ParkDetails
            visited={visited}
            comment={comment}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            park={park}
            details={details}
          />
        )}
      </Popup>
    </>
  );
};

Park.defaultProps = {
  userVisit: {
    userId: '',
    parkId: '',
    rating: '',
    comment: '',
    visited: '',
  },
};

export type { IDetails, IParkImage };
export default Park;
