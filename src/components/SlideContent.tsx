import type { Slide } from "@/data/slides";
import QuizSlide from "./QuizSlide";
import { CheckSquare, Square, Clock, AlertTriangle, BookOpen } from "lucide-react";

interface SlideContentProps {
  slide: Slide;
}

const typeConfig = {
  content: { color: "bg-primary", icon: BookOpen, label: "Materi" },
  quiz: { color: "bg-accent", icon: AlertTriangle, label: "Quiz" },
  task: { color: "bg-success", icon: CheckSquare, label: "Tugas" },
  challenge: { color: "bg-warning", icon: AlertTriangle, label: "Challenge" },
};

const SlideContent = ({ slide }: SlideContentProps) => {
  const config = typeConfig[slide.type];
  const Icon = config.icon;

  return (
    <div className="slide-enter">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-accent-foreground ${config.color}`}
        >
          <Icon size={14} />
          {config.label}
        </span>
        {slide.timer && (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground">
            <Clock size={14} />
            {slide.timer} menit
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground font-semibold mb-1">
        {slide.subtitle}
      </p>

      <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
        <span className="mr-2">{slide.icon}</span>
        {slide.title}
      </h2>

      {/* Content paragraphs */}
      {slide.content && (
        <div className="space-y-2 mb-6">
          {slide.content.map((text, i) => (
            <p key={i} className="text-lg text-muted-foreground leading-relaxed">
              {text}
            </p>
          ))}
        </div>
      )}

      {/* Checklist */}
      {slide.checklist && (
        <ul className="space-y-3 mb-6">
          {slide.checklist.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
            >
              <CheckSquare
                size={20}
                className="text-success mt-0.5 flex-shrink-0"
              />
              <span className="font-medium text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tasks */}
      {slide.tasks && (
        <ul className="space-y-3 mb-6">
          {slide.tasks.map((task, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
            >
              <Square
                size={20}
                className="text-muted-foreground mt-0.5 flex-shrink-0"
              />
              <span className="font-medium text-foreground">{task}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Quiz */}
      {slide.quiz && <QuizSlide questions={slide.quiz} />}

      {/* Note */}
      {slide.note && (
        <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
          <p className="text-sm font-semibold text-accent">
            {slide.note}
          </p>
        </div>
      )}
    </div>
  );
};

export default SlideContent;
