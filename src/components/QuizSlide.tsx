import { useState } from "react";
import type { QuizQuestion } from "@/data/slides";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizSlideProps {
  questions: QuizQuestion[];
  slideId: number;
  onAnswer?: (slideId: number, questionIndex: number, isCorrect: boolean) => void;
}

const QuizSlide = ({ questions, slideId, onAnswer }: QuizSlideProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const handleSelect = (qIndex: number, label: string, correct?: boolean) => {
    if (revealed[qIndex]) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: label }));
    setRevealed((prev) => ({ ...prev, [qIndex]: true }));
    onAnswer?.(slideId, qIndex, !!correct);
  };

  return (
    <div className="space-y-8">
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="space-y-4">
          <h3 className="text-lg font-bold text-foreground">
            {qIndex + 1}. {q.question}
          </h3>
          <div className="space-y-3">
            {q.options.map((opt) => {
              const selected = answers[qIndex] === opt.label;
              const isRevealed = revealed[qIndex];
              const isCorrect = opt.correct;

              let optionClasses =
                "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ";

              if (!isRevealed) {
                optionClasses +=
                  "border-border hover:border-primary hover:bg-primary/5";
              } else if (selected && isCorrect) {
                optionClasses += "border-success bg-success/10 quiz-correct";
              } else if (selected && !isCorrect) {
                optionClasses += "border-destructive bg-destructive/10 quiz-wrong";
              } else if (isCorrect) {
                optionClasses += "border-success bg-success/5";
              } else {
                optionClasses += "border-border opacity-50";
              }

              return (
                <button
                  key={opt.label}
                  className={optionClasses}
                  onClick={() => handleSelect(qIndex, opt.label, opt.correct)}
                  disabled={isRevealed}
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-sm text-secondary-foreground">
                    {opt.label.toUpperCase()}
                  </span>
                  <span className="text-left font-medium text-foreground">{opt.text}</span>
                  {isRevealed && selected && isCorrect && (
                    <CheckCircle className="ml-auto text-success flex-shrink-0" size={22} />
                  )}
                  {isRevealed && selected && !isCorrect && (
                    <XCircle className="ml-auto text-destructive flex-shrink-0" size={22} />
                  )}
                  {isRevealed && !selected && isCorrect && (
                    <CheckCircle className="ml-auto text-success flex-shrink-0 opacity-60" size={22} />
                  )}
                </button>
              );
            })}
          </div>
          {revealed[qIndex] && q.explanation && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-primary font-medium">
                💡 {q.explanation}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizSlide;
