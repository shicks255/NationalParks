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
  state: IState;
  coords: [number, number];
  outline: [number, number][];
  rating?: number;
  yourComment?: string;
  yourVisit?: any;
}

class ParkLocation {
  id: number;

  name: string;

  type: LocationType;

  state: IState;

  coords: [number, number];

  outline: [number, number][];

  rating?: number;

  yourComment?: string;

  yourVisit?: string;

  constructor(location: ILocation) {
    this.id = location.id;
    this.name = location.name;
    this.type = location.type;
    this.state = location.state;
    this.coords = location.coords;
    this.outline = location.outline;
    this.rating = location.rating;
    this.yourComment = location.yourComment;
    this.yourVisit = location.yourVisit;
  }
}

export { ParkLocation, LocationType, State };
export type { ILocation, IState };
