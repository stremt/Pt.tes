// Prime number utilities
export function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export function getPrimeFactors(n: number): number[] {
  const factors: number[] = [];
  let num = Math.abs(Math.floor(n));
  
  while (num % 2 === 0) {
    factors.push(2);
    num = num / 2;
  }
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    while (num % i === 0) {
      factors.push(i);
      num = num / i;
    }
  }
  
  if (num > 2) {
    factors.push(num);
  }
  
  return factors;
}

export function generatePrimes(start: number, end: number): number[] {
  const primes: number[] = [];
  for (let i = start; i <= end; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
}

// GCD and LCM
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

// Statistics
export function calculateMean(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

export function calculateMedian(numbers: number[]): number {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function calculateMode(numbers: number[]): number[] {
  const frequency: Record<number, number> = {};
  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
  });
  
  const maxFreq = Math.max(...Object.values(frequency));
  return Object.keys(frequency)
    .filter(key => frequency[Number(key)] === maxFreq)
    .map(Number);
}

// Fibonacci
export function generateFibonacci(count: number): number[] {
  if (count <= 0) return [];
  if (count === 1) return [0];
  
  const fib = [0, 1];
  for (let i = 2; i < count; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}

// Quadratic formula
export function solveQuadratic(a: number, b: number, c: number): { 
  roots: number[], 
  discriminant: number,
  type: 'real' | 'complex' | 'repeated'
} {
  const discriminant = b * b - 4 * a * c;
  
  if (discriminant > 0) {
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return { roots: [root1, root2], discriminant, type: 'real' };
  } else if (discriminant === 0) {
    const root = -b / (2 * a);
    return { roots: [root], discriminant, type: 'repeated' };
  } else {
    return { roots: [], discriminant, type: 'complex' };
  }
}

// Ratio simplifier
export function simplifyRatio(a: number, b: number): [number, number] {
  const divisor = gcd(a, b);
  return [a / divisor, b / divisor];
}
