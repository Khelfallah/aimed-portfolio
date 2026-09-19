'use client';

import { useEffect, useState } from 'react';

const activities = [
  [0, 90, '🌙 Said “I’m going to sleep” an hour ago'],
  [90, 450, '💤 Dreaming in 4K + white noise'],
  [450, 510, '☕ Aimed.exe is starting up…'],
  [510, 600, '📚 Learning something I’ll probably use next week'],
  [600, 720, '💼 Doing the work that pays the bills'],
  [720, 780, '🍽️ Lunch. Absolutely no pixels.'],
  [780, 900, '💼 Making things look more expensive than they are'],
  [900, 1020, '🎨 Moving rectangles until they feel right'],
  [1020, 1170, '☕ “Taking a break” but somehow still talking about work'],
  [1170, 1260, '🚀 Working on yet another project'],
  [1260, 1320, '📚 Doing the thing I definitely didn’t procrastinate on'],
  [1320, 1380, '🎬 Watching “just one episode”'],
  [1380, 1440, '✦ Had a small idea. This is getting out of hand.'],
] as const;

function getJijelTime() {
  const parts = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Africa/Algiers',
  }).formatToParts(new Date());

  return {
    hour: parts.find((part) => part.type === 'hour')?.value ?? '',
    minute: parts.find((part) => part.type === 'minute')?.value ?? '',
    period: parts.find((part) => part.type === 'dayPeriod')?.value ?? '',
  };
}

function getJijelActivity() {
  const parts = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Africa/Algiers',
  }).formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0);
  const minutes = hour * 60 + minute;
  return activities.find(([start, end]) => minutes >= start && minutes < end)?.[2] ?? activities[0][2];
}

function splitActivity(activity: string) {
  const separator = activity.indexOf(' ');
  return separator === -1
    ? { icon: activity, text: '' }
    : { icon: activity.slice(0, separator), text: activity.slice(separator + 1) };
}

function getJijelIsDay() {
  const parts = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Africa/Algiers',
  }).formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? 0);
  const minutes = hour * 60 + minute;
  return minutes >= 450 && minutes < 1170;
}

export function JijelTime() {
  const [time, setTime] = useState(getJijelTime);

  useEffect(() => {
    const interval = window.setInterval(() => setTime(getJijelTime()), 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      {time.hour}:{time.minute} <span>{time.period}</span>
    </>
  );
}

export function JijelActivity() {
  const [activity, setActivity] = useState(getJijelActivity);

  useEffect(() => {
    const interval = window.setInterval(() => setActivity(getJijelActivity()), 30_000);
    return () => window.clearInterval(interval);
  }, []);

  const { icon, text } = splitActivity(activity);

  return (
    <>
      <span className="sleep-card-status-icon" aria-hidden="true">{icon}</span>
      <span className="sleep-card-status-copy">{text}</span>
    </>
  );
}

export function JijelSkyIcon() {
  const [isDay, setIsDay] = useState(getJijelIsDay);

  useEffect(() => {
    const interval = window.setInterval(() => setIsDay(getJijelIsDay()), 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return isDay ? (
    <svg className="sun-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M16.4 3.5a8.5 8.5 0 1 0 4.1 12.9A7.6 7.6 0 0 1 16.4 3.5Z" />
    </svg>
  );
}
