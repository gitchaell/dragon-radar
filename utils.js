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

const screenWidth = screen.width | window.innerWidth | document.documentElement.clientWidth;
const screenHeight = screen.height | window.innerHeight | document.documentElement.clientHeight;
const ballDiameter = 16;
const mapWidth = screenWidth - ballDiameter;
const mapHeight = screenHeight - ballDiameter;



function toAbsolutePosition({ longitude, latitude }) {
  if (longitude)
    return (longitude + 180) * (mapWidth / 360);

  if (latitude)
    return (latitude + 180) * (mapHeight / 360);s
}