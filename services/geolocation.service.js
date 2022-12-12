class GeolocationService {

  constructor () {
    this.subscriptionId = null;
  }

  getRandomCoords() {
    return {
      latitude: random({ minNumber: -90, maxNumber: 90, decimalPlaces: 6 }),
      longitude: random({ minNumber: -180, maxNumber: 180, decimalPlaces: 6 }),
    };
  }

  getCoords() {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }), reject,
        { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000, })
    );
  }

  openCoordsInfo({ latitude, longitude }) {
    window.open(`https://maps.google.com/?q=${latitude},${longitude}`, 'mozillaWindow', 'popup,width=320,height=640');
  }

  subscribe(callback) {
    this.subscriptionId = navigator.geolocation.watchPosition(callback);
  }

  unsubscribe() {
    navigator.geolocation.clearWatch(this.subscriptionId);
  }
}