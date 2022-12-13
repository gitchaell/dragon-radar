class Map {

  constructor () {
    this.node = document.querySelector('div.map');
  }

  getWidth() {
    return document.body.clientWidth | window.screen.width;
  }

  getHeight() {
    return document.body.clientHeight | window.screen.height;
  }

  rotate(alpha) {
    this.node.style.transform = `rotateZ(${alpha}deg)`;
  }

  updateDimensions() {
    this.width = this.getWidth();
    this.height = this.getHeight();
  }
}