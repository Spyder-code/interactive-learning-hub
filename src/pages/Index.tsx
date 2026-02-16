import { useState, useEffect, useCallback } from "react";
import { slides } from "@/data/slides";
import SlideProgress from "@/components/SlideProgress";
import SlideContent from "@/components/SlideContent";
import SlideTimer from "@/components/SlideTimer";
import { ChevronLeft, ChevronRight, Monitor } from "lucide-react";

const Index = () => {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, slides.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Monitor size={18} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-foreground leading-tight">
                PERTEMUAN 1
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                Microsoft Word — Self Learning
              </p>
            </div>
          </div>
          <SlideTimer totalMinutes={90} />
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-5xl mx-auto w-full px-4 pt-4">
        <SlideProgress current={current} total={slides.length} />
      </div>

      {/* Slide Selector (thumbnails) */}
      <div className="max-w-5xl mx-auto w-full px-4 pt-4">
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-10 h-10 rounded-lg text-xs font-bold transition-all duration-200 ${
                i === current
                  ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                  : i < current
                  ? "bg-success/20 text-success"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {s.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <div
          key={current}
          className="bg-card rounded-2xl border border-border p-6 md:p-10 shadow-sm min-h-[400px]"
        >
          <SlideContent slide={slide} />
        </div>
      </main>

      {/* Navigation */}
      <footer className="border-t border-border bg-card sticky bottom-0">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
            Sebelumnya
          </button>

          <span className="text-sm font-bold text-muted-foreground">
            {current + 1} / {slides.length}
          </span>

          <button
            onClick={goNext}
            disabled={current === slides.length - 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Selanjutnya
            <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Index;
