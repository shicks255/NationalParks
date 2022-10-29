import { LatLngTuple } from 'leaflet';
import { makeAutoObservable, runInAction } from 'mobx';
import { IDetails } from '../components/Park/ParkPopup';
import { ParkLocation } from '../Models/Location';
import { getParkInfo, getParkOutline, getParks } from '../ParksApi';

class ParkStore {
  parkInfo: IDetails | undefined;

  parks: ParkLocation[];

  parkOutline: LatLngTuple[][] | undefined;

  isLoading: boolean;

  constructor() {
    this.parks = [];
    this.parkInfo = undefined;
    this.isLoading = false;
    this.parkOutline = undefined;
    makeAutoObservable(this);
  }

  // eslint-disable-next-line class-methods-use-this
  async loadPark(code: string) {
    this.isLoading = true;
    const info = await getParkInfo(code);
    runInAction(() => {
      this.parkInfo = info;
      this.isLoading = false;
    });
  }

  async loadParks() {
    this.isLoading = true;
    const parks = await getParks();
    runInAction(() => {
      this.parks = parks;
      this.isLoading = false;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async loadParkOutline(code: string) {
    this.isLoading = true;
    const outline = await getParkOutline(code);
    runInAction(() => {
      this.parkOutline = outline;
      this.isLoading = false;
    });
  }
}

const parkStore = new ParkStore();
export default parkStore;
