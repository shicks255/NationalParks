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
  name: string;

  type: LocationType;

  state: IState;

  coords: [number, number];

  outline: [number, number][];

  constructor(location: ILocation) {
    this.name = location.name;
    this.type = location.type;
    this.state = location.state;
    this.coords = location.coords;
    this.outline = location.outline;
  }
}

export { ParkLocation, LocationType, State };
export type { ILocation, IState };
