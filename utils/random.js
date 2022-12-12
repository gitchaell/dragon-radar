function random({ minNumber, maxNumber, decimalPlaces }) {
  const number = Math.random() * (maxNumber - minNumber) + minNumber;
  const power = Math.pow(10, decimalPlaces);
  return Math.floor(number * power) / power;
}