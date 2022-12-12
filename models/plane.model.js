class Plane {

  constructor () {
    this.node = document.querySelector('div.plane');
  }

  rotate(alpha) {
    this.node.style.transform = `rotateZ(${alpha}deg)`;
  }
}