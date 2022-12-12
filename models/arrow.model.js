class Arrow {

  constructor () {

    this.node = document.querySelector('div.arrow');

    this.updateCoords = (coords) => {

      this.coords = coords;
      this.node.dataset.coords = JSON.stringify(this.coords);

      rxjs.fromEvent(this.node, 'click').subscribe(() => {
        window.radar.service.geolocation.openCoordsInfo(this.coords);
      });
    }

    window.radar.service.geolocation.getCoords().then(this.updateCoords);
  }

  show() {
    this.node.style.opacity = 1;
  }
}