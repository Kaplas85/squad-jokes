function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcmTwo(a: number, b: number) {
  return Math.abs(a * b) / gcd(a, b);
}

function computeLCM(numbers: number[]) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error("Se requiere un array no vacío de números");
  }
  return numbers.reduce((acc, n) => lcmTwo(acc, n));
}

function increment(n: number) {
  return n + 1;
}

export { computeLCM, increment };
