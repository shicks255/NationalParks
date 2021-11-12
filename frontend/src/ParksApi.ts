import { LocationType, ParkLocation, State } from "./Models/Location";
import { User } from "./Models/User";
import { UserVisit } from "./Models/UserVisit";

function getUser(): User {
  return new User({
    id: 1,
    username: "shicks255",
  });
}

async function getUser2(): Promise<User> {
  const response = await fetch("http://localhost:3001/user");
  const user = response.json();
  console.log(user);
  return user;
}

async function getUserVisits(): Promise<UserVisit[]> {
  const response = await fetch("http://localhost:3001/api/userVisits/1");
  const visits = response.json();
  return visits;
}

async function getParks(): Promise<ParkLocation[]> {
  const response = await fetch("http://localhost:3001/api/parks");
  const parks = response.json();
  console.log(parks);
  return parks;
}

// eslint-disable-next-line import/prefer-default-export
export { getParks, getUser, getUserVisits };
