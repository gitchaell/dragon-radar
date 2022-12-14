export default class Button {

  constructor () {
    this.node = document.querySelector('div.button');
    this.audio = {
      gluid: new Audio('assets/audios/gluid.mp3'),
    };
  }

  click() {
    this.audio.gluid.play();
    this.node.style.display = 'none';
  }
}