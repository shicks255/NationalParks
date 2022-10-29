enum LocationType {
  'National_Park',
  'National_Monument',
}

enum State {
  'NJ',
  'AZ',
}

interface IState {
  abv: State;
  name: string;
}

interface ILocation {
  id: number;
  name: string;
  type: LocationType;
  code: string;
  state: IState;
  // coords: [number, number];
  latitude: number;
  longitude: number;
  outline: string;
  rating?: number;
  yourComment?: string;
  yourVisit?: string;
}

class ParkLocation {
  id: number;

  name: string;

  type: LocationType;

  code: string;

  state: IState;

  // coords: [number, number];
  //
  latitude: number;

  longitude: number;

  outline: string;

  rating?: number;

  yourComment?: string;

  yourVisit?: string;

  constructor(location: ILocation) {
    this.id = location.id;
    this.name = location.name;
    this.type = location.type;
    this.state = location.state;
    this.code = location.code;
    this.longitude = location.longitude;
    this.latitude = location.latitude;
    // this.coords = location.coords;
    this.outline = location.outline;
    this.rating = location.rating;
    this.yourComment = location.yourComment;
    this.yourVisit = location.yourVisit;
  }
}

export { ParkLocation, LocationType, State };
export type { ILocation, IState };
