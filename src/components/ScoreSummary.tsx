import { Trophy, CheckCircle, XCircle, Target } from "lucide-react";
import { slides } from "@/data/slides";

interface ScoreSummaryProps {
  quizResults: Record<string, boolean>; // "slideId-qIndex" -> correct
}

const ScoreSummary = ({ quizResults }: ScoreSummaryProps) => {
  // Count total quiz questions across all slides
  const quizSlides = slides.filter((s) => s.quiz && s.quiz.length > 0);
  let totalQuestions = 0;
  quizSlides.forEach((s) => {
    totalQuestions += s.quiz!.length;
  });

  const answered = Object.keys(quizResults).length;
  const correct = Object.values(quizResults).filter(Boolean).length;
  const wrong = answered - correct;
  const unanswered = totalQuestions - answered;
  const percentage = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

  const getGrade = () => {
    if (percentage >= 90) return { label: "A", color: "text-success", message: "Luar biasa! 🌟" };
    if (percentage >= 75) return { label: "B", color: "text-primary", message: "Bagus sekali! 👏" };
    if (percentage >= 60) return { label: "C", color: "text-warning", message: "Cukup baik! 💪" };
    return { label: "D", color: "text-destructive", message: "Perlu belajar lagi 📚" };
  };

  const grade = getGrade();

  return (
    <div className="space-y-6 slide-enter">
      {/* Score Circle */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="10"
            />
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke="hsl(var(--success))"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 327} 327`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-foreground">{percentage}%</span>
          </div>
        </div>
        <div className="text-center">
          <span className={`text-5xl font-extrabold ${grade.color}`}>{grade.label}</span>
          <p className="text-lg font-bold text-foreground mt-1">{grade.message}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-success/10 border border-success/20">
          <CheckCircle size={24} className="text-success" />
          <span className="text-2xl font-extrabold text-success">{correct}</span>
          <span className="text-xs font-semibold text-muted-foreground">Benar</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <XCircle size={24} className="text-destructive" />
          <span className="text-2xl font-extrabold text-destructive">{wrong}</span>
          <span className="text-xs font-semibold text-muted-foreground">Salah</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-secondary border border-border">
          <Target size={24} className="text-muted-foreground" />
          <span className="text-2xl font-extrabold text-foreground">{totalQuestions}</span>
          <span className="text-xs font-semibold text-muted-foreground">Total</span>
        </div>
      </div>

      {/* Per-quiz breakdown */}
      <div className="space-y-2">
        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Detail per Quiz</h4>
        {quizSlides.map((s) => {
          const qCount = s.quiz!.length;
          let qCorrect = 0;
          for (let i = 0; i < qCount; i++) {
            const key = `${s.id}-${i}`;
            if (quizResults[key] === true) qCorrect++;
          }
          const qAnswered = Array.from({ length: qCount }, (_, i) => `${s.id}-${i}`)
            .filter((k) => k in quizResults).length;

          return (
            <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-2">
                <span className="text-lg">{s.icon}</span>
                <span className="font-semibold text-sm text-foreground">{s.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-success">{qCorrect}/{qCount}</span>
                {qAnswered < qCount && (
                  <span className="text-xs text-muted-foreground">(belum lengkap)</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {unanswered > 0 && (
        <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
          <p className="text-sm font-semibold text-warning">
            ⚠️ {unanswered} soal belum dijawab. Kembali ke slide quiz untuk melengkapi!
          </p>
        </div>
      )}
    </div>
  );
};

export default ScoreSummary;
