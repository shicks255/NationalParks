import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';
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

  const [top, setTop] = useState(window.innerHeight / 2);
  const [touchStart, setTouchStart] = useState<number | undefined>(undefined);
  const [position, setPosition] = useState<undefined | 'down' | 'up'>(
    undefined
  );

  const getHeight = () =>
    // if (!position) {
    //   return window.innerHeight / 2;
    // }

    // if (position === 'up') {
    //   return `${window.innerHeight - 36}px`;
    // }

    window.innerHeight - top;

  const isMobile = useIsMobile();
  const shelfClass = isMobile
    ? 'mobile-shelf-container'
    : 'left-shelf-container';

  const parkDetails = useParkInfo(selectedPark.code, true);

  if (!parkDetails) {
    return <div className={`${shelfClass} ${selectedPark ? 'active' : ''}`} />;
  }

  const selectedParkDetails = parkDetails.data;

  if (!selectedParkDetails) {
    return null;
  }

  const start: React.TouchEventHandler<HTMLDivElement> = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    setTouchStart(e.changedTouches[0].clientY);
  };

  const move = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart) {
      const x = e.changedTouches[0].clientY;
      const totalDistanceMoved = x - touchStart;
      setTop(() => {
        if (!position) {
          return window.innerHeight / 2 + totalDistanceMoved;
        }
        if (position === 'up') {
          return 36 + totalDistanceMoved;
        }

        return 500 + totalDistanceMoved;
      });
    }
  };

  const end = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart) {
      const x = e.changedTouches[0].clientY;
      const distMoved = touchStart - x;
      if (Math.abs(distMoved) > 75) {
        if (distMoved < 0) {
          if (!position) {
            setPosition('down');
            setTop(500);
          }
          if (position === 'up') {
            setPosition(undefined);
            setTop(window.innerHeight / 2);
          }
        } else {
          if (!position) {
            setPosition('up');
            setTop(36);
          }
          if (position === 'down') {
            setPosition(undefined);
            setTop(window.innerHeight / 2);
          }
        }
      } else {
        setTop(window.innerHeight / 2);
        setPosition(undefined);
      }
      setTouchStart(x);
    }
  };

  return (
    <div
      style={{ top, height: getHeight() }}
      className={`${shelfClass} ${selectedPark ? 'active' : ''}`}
    >
      {isMobile && (
        <div
          className="shelf-handle-container"
          onTouchStart={start}
          onTouchEnd={end}
          onTouchMove={move}
        >
          <div className="shelf-handle" />
        </div>
      )}
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
