import { zxcvbn } from "@zxcvbn-ts/core";

export interface PasswordSecurity {
  entropy: number;
  strengthLabel: string;
  strengthColor: string;
  strengthPercent: number;
  crackTime: string;
  score: number;
  feedback?: {
    warning: string;
    suggestions: string[];
  };
}

export function calculatePasswordSecurity(password: string): PasswordSecurity {
  if (!password) {
    return {
      entropy: 0,
      strengthLabel: "Weak",
      strengthColor: "bg-red-600",
      strengthPercent: 0,
      crackTime: "Instantly",
      score: 0,
    };
  }

  const result = zxcvbn(password);
  const entropy = Math.round(Math.log2(result.guesses));
  const score = result.score;
  const crackTime = result.crackTimesDisplay.offlineFastHashing1e10PerSecond;

  let strengthLabel = "Weak";
  let strengthColor = "bg-red-600";
  let strengthPercent = 20;

  switch (score) {
    case 0:
      strengthLabel = "Very Weak";
      strengthColor = "bg-red-600";
      strengthPercent = 20;
      break;
    case 1:
      strengthLabel = "Weak";
      strengthColor = "bg-orange-600";
      strengthPercent = 40;
      break;
    case 2:
      strengthLabel = "Moderate";
      strengthColor = "bg-yellow-600";
      strengthPercent = 60;
      break;
    case 3:
      strengthLabel = "Strong";
      strengthColor = "bg-blue-600";
      strengthPercent = 80;
      break;
    case 4:
      strengthLabel = "Very Strong";
      strengthColor = "bg-green-600";
      strengthPercent = 100;
      break;
  }

  return {
    entropy,
    strengthLabel,
    strengthColor,
    strengthPercent,
    crackTime,
    score,
    feedback: result.feedback,
  };
}
