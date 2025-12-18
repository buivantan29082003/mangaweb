export function formatReactionNumber(num) {
  if (num < 1000) return num.toString();

  const units = ["K", "M", "B", "T"]; 
  let unitIndex = -1;
  let n = num;

  while (n >= 1000 && unitIndex < units.length - 1) {
    n /= 1000;
    unitIndex++;
  } 
  let formatted = parseFloat(n.toFixed(1)); 
  if (formatted % 1 === 0) {
    formatted = Math.round(formatted);
  }

  return formatted + units[unitIndex];
}
