import { useState, useEffect } from "react";

interface SlideTimerProps {
  startDateTime?: number; // Waktu mulai mengerjakan meeting (timestamp)
  completedDuration?: number; // Durasi final dalam menit (untuk meeting yang sudah selesai)
}

const SlideTimer = ({ startDateTime, completedDuration }: SlideTimerProps) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    // Jika meeting sudah selesai, tampilkan durasi final
    if (completedDuration !== undefined) {
      setElapsedSeconds(completedDuration * 60);
      return;
    }

    // Jika meeting belum dimulai
    if (!startDateTime) {
      setElapsedSeconds(0);
      return;
    }

    // Meeting sedang berjalan - hitung elapsed time dari start sampai sekarang
    const updateElapsed = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - startDateTime) / 1000);
      setElapsedSeconds(elapsed);
    };

    // Update immediately
    updateElapsed();

    // Update every second
    const id = setInterval(updateElapsed, 1000);
    return () => clearInterval(id);
  }, [startDateTime, completedDuration]);

  const hours = Math.floor(elapsedSeconds / 3600);
  const mins = Math.floor((elapsedSeconds % 3600) / 60);
  const secs = elapsedSeconds % 60;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground font-semibold">
        {completedDuration !== undefined ? "Durasi:" : "Waktu Belajar:"}
      </span>
      <span
        className={`font-mono text-xl font-bold tabular-nums ${
          completedDuration !== undefined ? "text-success" : "text-primary"
        }`}
      >
        {hours > 0 && `${String(hours).padStart(2, "0")}:`}
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </span>
    </div>
  );
};

export default SlideTimer;
