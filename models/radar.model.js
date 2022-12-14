// services
import GeolocationService from '../services/geolocation.service.js';
import OrientationService from '../services/orientation.service.js';
// models
import Button from './button.model.js';
import Map from './map.model.js';
import Arrow from './arrow.model.js';
import Ball from './ball.model.js';


export default class Radar {

  constructor () {
    this.service = {
      orientation: new OrientationService(),
      geolocation: new GeolocationService(),
    };
    this.audio = {
      beep: new Audio('assets/audios/beep.mp3'),
    };
  }

  start() {

    this.button = new Button();
    this.map = new Map();
    this.arrow = new Arrow();
    this.balls = [
      new Ball({ stars: 1 }),
      new Ball({ stars: 2 }),
      new Ball({ stars: 3 }),
      new Ball({ stars: 4 }),
      new Ball({ stars: 5 }),
      new Ball({ stars: 6 }),
      new Ball({ stars: 7 }),
    ];

    rxjs.fromEvent(this.button.node, 'click').subscribe(() => {

      Promise.all([
        navigator.permissions.query({ name: 'accelerometer' }),
        navigator.permissions.query({ name: 'magnetometer' }),
        navigator.permissions.query({ name: 'gyroscope' }),
        navigator.permissions.query({ name: 'geolocation' }),
      ]).then(results => {

        if (results.some(({ state }) => state === 'denied')) return;

        this.button.click();

        this.arrow.show();

        this.balls.forEach(ball => ball.locate());

        rxjs.interval(1000).subscribe(() => {
          this.audio.beep.cloneNode().play();
          this.balls.forEach(ball => ball.blink());
        });

        this.service.geolocation.subscribe(coords => {
          this.arrow.setCoords(coords);
        });

        this.service.orientation.subscribe(({ beta, gamma, alpha }) => {
          this.map.rotate({ z: alpha });
          this.arrow.rotate({ x: beta, y: gamma });
        });

        rxjs.fromEvent(window, 'resize').subscribe(() => {
          this.map.resize();
          this.balls.forEach(ball => ball.locate());
        });
      });
    });

  }

}