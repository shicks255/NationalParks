import { LatLngTuple } from 'leaflet';
import { useQuery, QueryObserverResult } from '@tanstack/react-query';
import { ParkLocation } from './Models/Location';
import { IUser, User } from './Models/User';
import { UserVisit } from './Models/UserVisit';
import { IDetails } from './components/Park/ParkPopup';

const apiKey = process.env.REACT_APP_NPS_API_KEY;
const env = process.env.NODE_ENV;

const apiUrl =
  env === 'production'
    ? 'https://parksapi.shicks255.com'
    : 'http://localhost:8383';

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

export function useParkInfo(
  code: string,
  enabled: boolean
): QueryObserverResult<IDetails> {
  return useQuery(['details', code], async () => getParkInfo(code), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    retry: 3,
    enabled,
  });
}

async function getParkOutline(
  code: string | undefined
): Promise<LatLngTuple[][]> {
  const response = await fetch(`${apiUrl}/api/parks/outline/${code}`);
  const outline = response.json();
  return outline;
}

export function useParkOutline(
  selectedPark: ParkLocation | undefined
): QueryObserverResult<LatLngTuple[][]> {
  return useQuery(
    ['outline', selectedPark?.code],
    async () => getParkOutline(selectedPark?.code),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
      retry: 3,
      enabled: !!selectedPark,
    }
  );
}

async function getUserVisits(userId: string): Promise<UserVisit[]> {
  const response = await fetch(`${apiUrl}/api/userVisit/${userId}`);
  const visits = response.json();
  return visits;
}

export function useUserVisits(
  userId: string,
  enabled: boolean
): QueryObserverResult<UserVisit[]> {
  return useQuery([], async () => getUserVisits(userId), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    retry: 3,
    enabled,
  });
}

async function getParks(): Promise<ParkLocation[]> {
  const response = await fetch(`${apiUrl}/api/parks`);
  const parks = response.json();
  return parks;
}

export function useParks(): QueryObserverResult<ParkLocation[]> {
  return useQuery(['parks'], getParks, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    retry: 3,
  });
}

async function saveUserVisit(userVisit: UserVisit): Promise<IUser> {
  const response = await fetch(`${apiUrl}/api/userVisit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userVisit),
  });
  const user = response.json();
  return user;
}

export {
  getParks,
  getUser,
  getUserVisits,
  saveUserVisit,
  getParkInfo,
  getParkOutline,
};
