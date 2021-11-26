import { ParkLocation } from './Models/Location';
import { IUser, User } from './Models/User';
import { UserVisit } from './Models/UserVisit';
import { IDetails } from './components/ParkPopup';

const apiKey = process.env.NPS_API_KEY;

function getUser(): User {
  return new User({
    id: 1,
    username: 'shicks255',
  });
}

async function getParkInfo(code: string): Promise<IDetails> {
  const response = await fetch(
    `https://developer.nps.gov/api/v1/parks?parkCode=${code}&api_key=${apiKey}`
  );
  return response.json().then((data) => {
    if (data.data) {
      return data.data[0];
    }

    return {};
  });
}

async function getUserVisits(userId: string): Promise<UserVisit[]> {
  const response = await fetch(`http://localhost:3001/api/userVisit/${userId}`);
  const visits = response.json();
  return visits;
}

async function getParks(): Promise<ParkLocation[]> {
  const response = await fetch('http://localhost:3001/api/parks');
  const parks = response.json();
  return parks;
}

async function saveUserVisit(userVisit: UserVisit): Promise<IUser> {
  const response = await fetch(`http://localhost:3001/api/userVisit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userVisit),
  });
  const user = response.json();
  return user;
}

export { getParks, getUser, getUserVisits, saveUserVisit, getParkInfo };
