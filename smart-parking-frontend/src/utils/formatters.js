export function formatCurrency(amount) {
  return `₹${Number(amount || 0).toFixed(0)}`;
}

export function formatDuration(hours) {
  if (!hours || hours <= 0) {
    return "0 hours";
  }

  return hours === 1 ? "1 hour" : `${hours} hours`;
}

export function formatVehicleType(type) {
  if (!type) {
    return "";
  }

  return type.charAt(0) + type.slice(1).toLowerCase();
}

export function formatDate(date) {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}