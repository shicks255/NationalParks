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

  const [top, setTop] = useState(window.innerHeight * 0.4);
  const [touchStart, setTouchStart] = useState<number | undefined>(undefined);
  const [position, setPosition] = useState<undefined | 'down' | 'up'>(
    undefined
  );
  const [isMoving, setIsMoving] = useState(false);
  const isMobile = useIsMobile();

  const getHeight = () => window.innerHeight - top;

  const getMiddleTop = () => window.innerHeight * 0.4;

  const getTopTop = () => 56;

  const getBottomTop = () => window.innerHeight - 72;

  let shelfClass = isMobile ? 'mobile-shelf-container' : 'left-shelf-container';

  if (isMoving) {
    shelfClass += ' moving';
  }

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

      if (x > window.innerHeight - 72) {
        return;
      }
      if (x < 50) {
        return;
      }

      const totalDistanceMoved = x - touchStart;
      setTop(() => {
        if (!position) {
          return getMiddleTop() + totalDistanceMoved;
        }
        if (position === 'up') {
          return getTopTop() + totalDistanceMoved;
        }

        return getBottomTop() + totalDistanceMoved;
      });
    }
  };

  const end = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsMoving(true);

    if (touchStart) {
      const x = e.changedTouches[0].clientY;
      const distMoved = touchStart - x;
      if (Math.abs(distMoved) > 75) {
        if (distMoved < 0) {
          // going down
          if (!position) {
            setPosition('down');
            setTop(getBottomTop());
          }
          if (position === 'up') {
            setPosition(undefined);
            setTop(getMiddleTop());
          }
        } else {
          // going up
          if (!position) {
            setPosition('up');
            setTop(getTopTop());
          }
          if (position === 'down') {
            setPosition(undefined);
            setTop(getMiddleTop());
          }
        }
      } else {
        if (!position) {
          setTop(getMiddleTop());
          setPosition(undefined);
        }
        if (position === 'down') {
          setTop(getBottomTop());
        }
        if (position === 'up') {
          setTop(getTopTop());
        }
      }
      setTouchStart(x);
    }
    setTimeout(() => {
      setIsMoving(false);
    }, 500);
  };

  return (
    <div
      style={isMobile ? { top, height: getHeight() } : {}}
      className={`${shelfClass} ${selectedPark ? 'active' : ''}`}
    >
      {isMobile && (
        <div
          className="mobile-shelf-handle-container"
          onTouchStart={start}
          onTouchEnd={end}
          onTouchMove={move}
        >
          <div className="mobile-shelf-handle" />
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
