import { makeAutoObservable } from 'mobx';
import { parkTypes } from '../Constants';
import { ParkLocation } from '../Models/Location';

class UIStore {
  selectedPark: ParkLocation | undefined;

  parkSearch: string;

  searchTextFocused: boolean;

  flyToPark: ParkLocation | undefined;

  expandedRightShelf: boolean;

  filters: { [key: string]: boolean };

  constructor() {
    this.selectedPark = undefined;
    this.parkSearch = '';
    this.searchTextFocused = false;
    this.flyToPark = undefined;
    this.expandedRightShelf = false;
    this.filters = {};

    Object.entries(parkTypes).forEach((ty) => {
      this.filters[ty[0]] = true;
    });
    makeAutoObservable(this);
  }

  toggleFilter(parkType: string) {
    this.filters[parkType] = !this.filters[parkType];
  }

  toggleAllFilters() {
    Object.keys(this.filters).forEach((key) => {
      this.filters[key] = true;
    });
  }

  toggleNoFilters() {
    Object.keys(this.filters).forEach((key) => {
      this.filters[key] = false;
    });
  }

  updateSelectedPark(park: ParkLocation | undefined) {
    this.selectedPark = park;
  }

  updateFlyToPark(park: ParkLocation | undefined) {
    this.flyToPark = park;
  }

  get inputDisplay() {
    let value = this.parkSearch;
    if (this.selectedPark) {
      value = this.selectedPark.name;
    }

    if (value.length > 30) {
      value = `${value.substring(0, 29)}...`;
    }

    return value;
  }
}

const uiStore = new UIStore();
export default uiStore;
