export default class Arrow {

  constructor () {

    this.node = document.querySelector('div.arrow');

    rxjs.fromEvent(this.node, 'click').subscribe(() => {
      window.radar.service.geolocation.openCoordsInfo(this.coords);
    });
  }

  show() {
    this.node.style.opacity = 1;
  }

  rotate({ x, y }) {
    this.node.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
  }

  setCoords(coords) {
    this.coords = coords;
    this.node.dataset.coords = `${this.coords.longitude},${this.coords.latitude}`;
  }
}