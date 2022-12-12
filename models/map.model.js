class Map {

  constructor () {
    this.node = document.querySelector('div.map');
  }

  getWidth() {
    return window.innerWidth | window.screen.width;
  }

  getHeight() {
    return window.innerHeight | window.screen.height;
  }

  rotate(alpha) {
    this.node.style.transform = `rotateZ(${alpha}deg)`;
  }

  updateDimensions() {
    this.width = this.getWidth();
    this.height = this.getHeight();
  }
}