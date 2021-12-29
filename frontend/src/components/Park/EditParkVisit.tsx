import React, { Dispatch, FC, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ParkLocation } from '../../Models/Location';
import { UserVisit } from '../../Models/UserVisit';
import { saveUserVisit } from '../../ParksApi';

interface IProps {
  park: ParkLocation;
  setIsEditing: Dispatch<React.SetStateAction<boolean>>;
  userVisit: UserVisit | undefined;
}

const EditParkVisit: FC<IProps> = (props) => {
  const { park, setIsEditing, userVisit } = props;
  const { name, code } = park;

  const { rating, comment, visited } = userVisit ?? {
    rating: '',
    comment: '',
    visited: '',
  };

  const { user } = useAuth0();
  const [newRating, setNewRating] = useState(rating);
  const [newComment, setNewComment] = useState(comment);
  const [newVisitDate, setNewVisitDate] = useState(visited);

  function saveVisit() {
    const newUserVisit: UserVisit = {
      userId: user?.sub?.slice(6) ?? '',
      parkId: code,
      rating: newRating,
      visited: newVisitDate,
      comment: newComment,
    };

    saveUserVisit(newUserVisit);
  }

  return (
    <div>
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
  );
};

export default EditParkVisit;
