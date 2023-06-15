export default function calculateWithdrawalFees(amount: number) {
  if (amount <= 500) {
    return 0.015 * amount; // 1.5%
  } else if (amount <= 1000) {
    return 0.01375 * amount; // 1.375%
  } else if (amount <= 2000) {
    return 0.0125 * amount; // 1.25%
  } else if (amount <= 5000) {
    return 0.01125 * amount; // 1.125%
  } else {
    return 0.01 * amount; // 1%
  }
}