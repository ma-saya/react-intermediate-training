import { useState, useEffect } from 'react';
import type { TimerRecord } from './types/timer';
import { formatTime } from './types/timer';
import { TimerDisplay } from './components/TimerDisplay';
import { HistoryList } from './components/HistoryList';

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [records, setRecords] = useState<TimerRecord[]>([]);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleToggle = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const handleRecord = () => {
    const newRecord: TimerRecord = {
      id: Date.now(),
      timeText: formatTime(time),
    };
    setRecords([newRecord, ...records]);
  };

  const handleClearRecords = () => setRecords([]);

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
      <TimerDisplay
        time={time}
      isRunning={isRunning}
      onToggle={handleToggle}
      onReset={handleReset}
      onRecord={handleRecord}
      />
      <HistoryList records={records} onClear={handleClearRecords} />
    </div>
  )
}