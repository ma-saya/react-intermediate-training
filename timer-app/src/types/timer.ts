export type TimerRecord = {
  id: number;
  timeText: string;
};

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");
  const ms = milliseconds.toString().padStart(2, "0");

  return `${m}:${s}.${ms}`;
};