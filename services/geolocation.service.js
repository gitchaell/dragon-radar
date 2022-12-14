import random from '../utils/random.js';

export default class GeolocationService {

  constructor () {
    this.subscriptionId = null;
    this.settings = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    };
  }

  getRandomCoords() {
    return {
      latitude: random({ minNumber: -90, maxNumber: 90, decimalPlaces: 6 }),
      longitude: random({ minNumber: -180, maxNumber: 180, decimalPlaces: 6 }),
    };
  }

  openCoordsInfo({ latitude, longitude }) {
    window.open(`https://maps.google.com/?q=${latitude},${longitude}`, 'mozillaWindow', 'popup,width=320,height=640');
  }

  subscribe(callback) {
    this.subscriptionId = navigator.geolocation.watchPosition(({ coords }) => callback(coords), console.error, this.settings);
  }

  unsubscribe() {
    navigator.geolocation.clearWatch(this.subscriptionId);
  }
}