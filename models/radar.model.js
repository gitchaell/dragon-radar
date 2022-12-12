class Radar {

  constructor () {

    window.radar = {
      service: {
        orientation: new OrientationService(),
        geolocation: new GeolocationService(),
      }
    };

    this.audio = {
      beep: new Audio('assets/audios/beep.mp3'),
    };

    this.button = new Button();
    this.plane = new Plane();
    this.map = new Map();
    this.arrow = new Arrow();
    this.balls = [
      new Ball({ stars: 1, map: this.map }),
      new Ball({ stars: 2, map: this.map }),
      new Ball({ stars: 3, map: this.map }),
      new Ball({ stars: 4, map: this.map }),
      new Ball({ stars: 5, map: this.map }),
      new Ball({ stars: 6, map: this.map }),
      new Ball({ stars: 7, map: this.map }),
    ];

    rxjs.fromEvent(this.button.node, 'click').subscribe(() => {

      Promise.all([
        navigator.permissions.query({ name: 'accelerometer' }),
        navigator.permissions.query({ name: 'magnetometer' }),
        navigator.permissions.query({ name: 'gyroscope' }),
        navigator.permissions.query({ name: 'geolocation' }),
      ]).then(results => {

        if (results.some(({ state }) => state === 'denied')) return;

        this.button.sound();
        this.button.hide();

        this.map.updateDimensions();

        this.arrow.show();

        this.balls.forEach(ball => ball.locate({
          width: this.map.width,
          height: this.map.height,
        }));

        this.startBeep();

        window.radar.service.orientation.subscribe(({ alpha }) => {
          this.plane.rotate(alpha);
          this.map.rotate(alpha);
        });
      });
    });

    rxjs.fromEvent(window, 'resize').subscribe(() => {
      this.map.updateDimensions();
      this.balls.forEach(ball => ball.locate({
        width: this.map.width,
        height: this.map.height,
      }));
    });
  }


  startBeep() {

    rxjs.interval(1000).subscribe(() => {
      this.balls.forEach(ball => ball.show());
      this.audio.beep.cloneNode().play();
      window.setTimeout(() => this.balls.forEach(ball => ball.hide()), 500);
    });
  }

}