class OrientationService {

  constructor () {
    this.sensor = new AbsoluteOrientationSensor({ frequency: 60, referenceFrame: 'device' });
  }

  getAngles() {

    const [x, y, z, w] = this.sensor.quaternion;
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
      alpha: (yaw * degree).toFixed(2),
      beta: (roll * degree).toFixed(2),
      gamma: (pitch * degree).toFixed(2),
    };
  }

  subscribe(callback) {

    this.sensor.addEventListener('reading', () => {
      callback(this.getAngles());
    })

    this.sensor.start();
  }
}