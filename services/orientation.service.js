export default class OrientationService {

  constructor () {
    this.sensor = new AbsoluteOrientationSensor({ frequency: 60, referenceFrame: 'device' });
  }

  quaternionToAngles([x, y, z, w]) {

    const degree = 180 / Math.PI;
    const pitch = Math.asin(2 * (w * y - x * z));
    let roll = Math.atan2(2 * (w * x + y * z), w * w - x * x - y * y + z * z);
    let yaw = Math.atan2(2 * (w * z + x * y), w * w + x * x - y * y - z * z);

    if (pitch === + Math.PI / 2) {
      roll = 0;
      yaw = 2 * Math.atan2(x, w);
    }

    if (pitch === - Math.PI / 2) {
      roll = 0;
      yaw = -2 * Math.atan2(x, w);
    }

    return {
      beta: (roll * degree).toFixed(0),
      gamma: (pitch * degree).toFixed(0),
      alpha: (yaw * degree).toFixed(0),
    };
  }

  subscribe(callback) {
    rxjs.fromEvent(this.sensor, 'reading')
      .pipe(rxjs.auditTime(200))
      .subscribe(() => {
        callback(this.quaternionToAngles(this.sensor.quaternion))
      });
    this.sensor.start();
  }
}