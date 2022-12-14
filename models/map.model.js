export default class Map {

  constructor () {
    this.node = document.querySelector('div.map');
    this.dimension = this.getDimension();
  }

  getDimension() {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    };
  }

  rotate({ z }) {
    this.node.style.transform = `rotateZ(${z}deg)`;
  }

  resize() {
    this.dimension = this.getDimension();
  }
}