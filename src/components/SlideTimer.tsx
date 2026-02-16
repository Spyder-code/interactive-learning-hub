import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface SlideTimerProps {
  totalMinutes: number;
}

const SlideTimer = ({ totalMinutes }: SlideTimerProps) => {
  const [seconds, setSeconds] = useState(totalMinutes * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setSeconds(totalMinutes * 60);
    setRunning(false);
  }, [totalMinutes]);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running, seconds]);

  const reset = useCallback(() => {
    setSeconds(totalMinutes * 60);
    setRunning(false);
  }, [totalMinutes]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isLow = seconds < 60 && seconds > 0;

  return (
    <div className="flex items-center gap-3">
      <span
        className={`font-mono text-2xl font-bold tabular-nums ${
          isLow ? "text-destructive" : seconds === 0 ? "text-muted-foreground" : "text-foreground"
        }`}
      >
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </span>
      <button
        onClick={() => setRunning(!running)}
        className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
      >
        {running ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <button
        onClick={reset}
        className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
};

export default SlideTimer;
