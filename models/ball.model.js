class Ball {

  constructor ({ stars }) {
    this.node = document.querySelector(`div.ball[data-stars="${stars}"]`);
    this.width = this.node.clientWidth;
    this.height = this.node.clientHeight;
    this.id = `ball.${stars}`;
    this.coords = this.getCoords();
    this.node.dataset.coords = `${this.coords.longitude},${this.coords.latitude}`;

    rxjs.fromEvent(this.node, 'click').subscribe(() => {
      window.radar.service.geolocation.openCoordsInfo(this.coords);
    });
  }

  getCoords() {

    const coordsStored = window.localStorage.getItem(this.id);

    if (coordsStored) return JSON.parse(coordsStored);

    const randomCoords = window.radar.service.geolocation.getRandomCoords();

    window.localStorage.setItem(this.id, JSON.stringify(randomCoords));

    return randomCoords;
  }

  locate({ width, height }) {

    const position = { left: width / 2, top: height / 2 };

    position.left = (this.coords.longitude + 180) * width / 360;

    if (this.coords.latitude > 0)
      position.top = (90 - this.coords.latitude) * height / 180;

    if (this.coords.latitude < 0)
      position.top = (90 + Math.abs(this.coords.latitude)) * height / 180;

    this.node.setAttribute('style', `top: ${position.top}px;left: ${position.left}px;`);
  }

  show() {
    this.node.style.opacity = 1;
  }

  hide() {
    this.node.style.opacity = +this.node.matches(':hover');
  }
}