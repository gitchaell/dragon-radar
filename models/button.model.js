class Button {

  constructor () {
    this.node = document.querySelector('div.button');
    this.audio = {
      gluid: new Audio('assets/audios/gluid.mp3'),
    };
  }

  sound() {
    this.audio.gluid.play();
  }

  hide() {
    this.node.style.display = 'none';
  }
}