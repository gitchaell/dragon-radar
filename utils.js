function random({ minNumber, maxNumber, decimalPlaces }) {
  const randomNumber = Math.random() * (maxNumber - minNumber) + minNumber;
  const power = Math.pow(10, decimalPlaces);
  return Math.floor(randomNumber * power) / power;
}

function randomLatitude() {
  return random({ minNumber: -90, maxNumber: 90, decimalPlaces: 6 });
}

function randomLongitude() {
  return random({ minNumber: -180, maxNumber: 180, decimalPlaces: 6 });
}


function eulerFromQuaternion({ x, y, z, w }) {

  let degree = 180 / Math.PI;
  let roll = Math.atan2(2 * (w * x + y * z), w * w - x * x - y * y + z * z);
  let pitch = Math.asin(2 * (w * y - x * z));
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

let screenWidth = screen.width;
let screenHeight = screen.height;
let ballDiameter = 16;
let mapWidth = screenWidth - ballDiameter;
let mapHeight = screenHeight - ballDiameter;