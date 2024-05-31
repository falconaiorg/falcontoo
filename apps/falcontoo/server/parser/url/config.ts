// Disallow private IP addresses and localhost
export const privateIpPatterns = [
  /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)/,
  /^https?:\/\/(10\.|172\.16\.|192\.168\.)/,
];
