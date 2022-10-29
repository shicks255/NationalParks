import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { ParkLocation } from '../Models/Location';
import { useParkInfo } from '../ParksApi';
import FeesDetails from './Park/FeesDetails';
import HoursDetails from './Park/HoursDetails';
import ImageDetails from './Park/ImageDetails';

interface IProps {
  selectedPark: ParkLocation;
}

const ParkDetailsShelf: React.FC<IProps> = ({ selectedPark }: IProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth0();

  const parkDetails = useParkInfo(selectedPark.code, true);

  if (!parkDetails) {
    return (
      <div className={`left-shelf-container ${selectedPark ? 'active' : ''}`} />
    );
  }

  const selectedParkDetails = parkDetails.data;

  if (!selectedParkDetails) {
    return null;
  }

  return (
    <div className={`left-shelf-container ${selectedPark ? 'active' : ''}`}>
      <div className="left-shelf-content">
        <h1>
          {selectedParkDetails?.fullName}{' '}
          <a href={selectedParkDetails.url} target="_blank" rel="noreferrer">
            <img
              className="external-link"
              width={15}
              src="/download.png"
              alt="(external)"
            />
          </a>
        </h1>
        <ImageDetails images={selectedParkDetails.images} />
        <blockquote>{selectedParkDetails.description}</blockquote>
        <blockquote>
          <h3>Hours</h3>
          <HoursDetails details={selectedParkDetails.operatingHours} />
        </blockquote>
        <blockquote>
          <h3>Weather</h3>
          {selectedParkDetails.weatherInfo}
        </blockquote>
        <blockquote>
          <h3>Fees</h3>
          <FeesDetails fees={selectedParkDetails.entranceFees} />
        </blockquote>
      </div>
    </div>
  );
};

export default ParkDetailsShelf;
