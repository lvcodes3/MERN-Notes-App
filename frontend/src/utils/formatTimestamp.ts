const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);

  return date.toLocaleString("en-US", {
    weekday: "short", // Short name of the day (e.g., "Wed")
    year: "numeric", // Year (e.g., "2024")
    month: "short", // Short name of the month (e.g., "Nov")
    day: "numeric", // Day of the month (e.g., "20")
    hour: "numeric", // Hour (e.g., "9 AM" or "21")
    minute: "2-digit", // Minutes (e.g., "09")
    second: "2-digit", // Seconds (optional)
    hour12: true, // Use 12-hour format
  });
};

export default formatTimestamp;
