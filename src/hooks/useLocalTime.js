import { useEffect, useState } from 'react';

function format(timeZone) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return '—';
  }
}

/** Live HH:MM clock for a given IANA time zone. */
export default function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    const id = window.setInterval(() => setTime(format(timeZone)), 30_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
