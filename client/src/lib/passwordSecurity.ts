export interface PasswordSecurity {
  entropy: number;
  strengthLabel: string;
  strengthColor: string;
  strengthPercent: number;
  crackTime: string;
}

export function calculatePasswordSecurity(password: string): PasswordSecurity {
  if (!password) {
    return {
      entropy: 0,
      strengthLabel: "Weak",
      strengthColor: "bg-red-600",
      strengthPercent: 0,
      crackTime: "Instantly",
    };
  }

  // 1. Character Set Detection
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  // Symbols: !@#$%^&*()_+-=[]{}|;:,.<>? (approx 33 characters as per requirements)
  if (/[^A-Za-z0-9]/.test(password)) charsetSize += 33;

  // 2. Entropy Calculation: L × log2(R)
  const entropy = Math.round(password.length * Math.log2(charsetSize || 1));

  // 3. Crack Time Estimation
  // Assume 1e12 guesses per second
  const combinations = Math.pow(2, entropy);
  const seconds = combinations / 1e12;

  let crackTime = "";
  if (seconds < 1) {
    crackTime = "Instantly";
  } else if (seconds < 60) {
    crackTime = `${Math.round(seconds)} seconds`;
  } else if (seconds < 3600) {
    crackTime = `${Math.round(seconds / 60)} minutes`;
  } else if (seconds < 86400) {
    crackTime = `${Math.round(seconds / 3600)} hours`;
  } else if (seconds < 31536000) {
    crackTime = `${Math.round(seconds / 86400)} days`;
  } else {
    const years = seconds / 31536000;
    const ageOfUniverse = 13.8e9;
    if (years > ageOfUniverse) {
      crackTime = "Longer than the age of the universe";
    } else if (years > 1e6) {
      crackTime = `${Math.round(years / 1e6)} million years`;
    } else {
      crackTime = `${Math.round(years)} years`;
    }
  }

  // 4. Strength Classification
  // 0–40 bits → Weak
  // 40–70 bits → Moderate
  // 70–100 bits → Strong
  // 100+ bits → Very Strong
  let strengthLabel = "Weak";
  let strengthColor = "bg-red-600";
  let strengthPercent = 20;

  if (entropy > 100) {
    strengthLabel = "Very Strong";
    strengthColor = "bg-green-600";
    strengthPercent = 100;
  } else if (entropy > 70) {
    strengthLabel = "Strong";
    strengthColor = "bg-blue-600";
    strengthPercent = 85;
  } else if (entropy > 40) {
    strengthLabel = "Moderate";
    strengthColor = "bg-yellow-600";
    strengthPercent = 40;
  } else {
    strengthLabel = "Weak";
    strengthColor = "bg-red-600";
    strengthPercent = 20;
  }

  return {
    entropy,
    strengthLabel,
    strengthColor,
    strengthPercent,
    crackTime,
  };
}
