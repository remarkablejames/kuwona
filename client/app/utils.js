export function getTimeAgo(timestamp) {
  const currentTime = new Date();
  const pastTime = new Date(timestamp);
  const timeDifference = currentTime - pastTime;
  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 60) {
    return seconds + " seconds ago";
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return hours + (hours === 1 ? " hour ago" : " hours ago");
  } else {
    const days = Math.floor(seconds / 86400);
    return days + (days === 1 ? " day ago" : " days ago");
  }
}
