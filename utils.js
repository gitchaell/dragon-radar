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

let screenWidth = screen.width;
let screenHeight = screen.height;
let ballDiameter = 16;
let mapWidth = screenWidth - ballDiameter;
let mapHeight = screenHeight - ballDiameter;