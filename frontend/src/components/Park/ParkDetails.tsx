import React, { Dispatch, FC } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ImageDetails from './ImageDetails';
import HoursDetails from './HoursDetails';
import FeesDetails from './FeesDetails';
import { ParkLocation } from '../../Models/Location';
import { IDetails } from './ParkPopup';

interface IProps {
  visited: string | undefined;
  comment: string | undefined;
  setIsEditing: Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  park: ParkLocation;
  details: IDetails | undefined;
}

const ParkDetails: FC<IProps> = (props) => {
  const { user } = useAuth0();
  const { visited, comment, setIsEditing, isEditing, park, details } = props;
  const { name, code } = park;
  return (
    <div className={`clicked-park-${code}`} id={code}>
      <div className="inner-popup-header">
        {user && (
          <button type="button" onClick={() => setIsEditing(!isEditing)}>
            Edit
          </button>
        )}
        <b className="park-title-text">
          {name}
          {details && (
            <a href={details.url} target="_blank" rel="noreferrer">
              <img
                className="external-link"
                width={15}
                src="/download.png"
                alt="(external)"
              />
            </a>
          )}
        </b>
      </div>
      <div className="inner-popup-content">
        <br />
        {details && <ImageDetails images={details?.images} />}
        <br />
        <blockquote>{details && details.description}</blockquote>
        <br />
        {details && (
          <blockquote>
            <HoursDetails details={details.operatingHours} />
          </blockquote>
        )}
        <br />
        {details && <blockquote>{details.weatherInfo}</blockquote>}
        <br />
        {details && (
          <blockquote>
            <FeesDetails fees={details.entranceFees} />
          </blockquote>
        )}
        <br />
        {/* Avg Rating {rating} */}
        {/* <br /> */}
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
    </div>
  );
};

export default ParkDetails;
