function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcmTwo(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function computeLCM(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error("Se requiere un array no vacío de números");
  }
  return numbers.reduce((acc, n) => lcmTwo(acc, n));
}

function increment(n) {
  return n + 1;
}

module.exports = {
  computeLCM,
  increment,
};
