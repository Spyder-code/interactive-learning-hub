import { useState, useEffect } from "react";
import type { QuizQuestion } from "@/data/slides";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useQuizStore } from "@/stores/quizStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface QuizSlideProps {
  questions: QuizQuestion[];
  slideId: number;
  onAnswer?: (
    slideId: number,
    questionIndex: number,
    isCorrect: boolean,
  ) => void;
}

const QuizSlide = ({ questions, slideId, onAnswer }: QuizSlideProps) => {
  const { saveAnswer, getAnswer, isAnswered } = useQuizStore();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [textInputs, setTextInputs] = useState<Record<number, string>>({});

  // Load jawaban yang sudah disimpan saat component mount
  useEffect(() => {
    const savedAnswers: Record<number, string> = {};
    const savedRevealed: Record<number, boolean> = {};
    const savedTextInputs: Record<number, string> = {};

    questions.forEach((q, qIndex) => {
      const savedAnswer = getAnswer(slideId, qIndex);
      if (savedAnswer) {
        savedAnswers[qIndex] = savedAnswer.selectedOption;
        savedRevealed[qIndex] = true;

        // For free-text questions, also store the text in textInputs
        const questionType = q.questionType || "multiple-choice";
        if (questionType === "free-text") {
          savedTextInputs[qIndex] = savedAnswer.selectedOption;
        }
      }
    });

    setAnswers(savedAnswers);
    setRevealed(savedRevealed);
    setTextInputs(savedTextInputs);
  }, [slideId, questions, getAnswer]);

  const handleSelect = (qIndex: number, label: string, correct?: boolean) => {
    // Cegah user untuk mengganti jawaban yang sudah ada
    if (isAnswered(slideId, qIndex)) return;
    if (revealed[qIndex]) return;

    const isCorrect = !!correct;

    // Update local state
    setAnswers((prev) => ({ ...prev, [qIndex]: label }));
    setRevealed((prev) => ({ ...prev, [qIndex]: true }));

    // Simpan ke store dan localStorage
    saveAnswer(slideId, qIndex, label, isCorrect, "multiple-choice");

    // Trigger callback
    onAnswer?.(slideId, qIndex, isCorrect);
  };

  const handleTextSubmit = (qIndex: number, q: QuizQuestion) => {
    // Cegah user untuk mengganti jawaban yang sudah ada
    if (isAnswered(slideId, qIndex)) return;
    if (revealed[qIndex]) return;

    const userAnswer = textInputs[qIndex]?.trim() || "";

    // For free-text, we always mark as correct unless there's a correctAnswer to check
    let isCorrect = true;
    if (q.correctAnswer) {
      isCorrect = userAnswer.toLowerCase() === q.correctAnswer.toLowerCase();
    }

    // Update local state
    setAnswers((prev) => ({ ...prev, [qIndex]: userAnswer }));
    setRevealed((prev) => ({ ...prev, [qIndex]: true }));

    // Simpan ke store dan localStorage
    saveAnswer(slideId, qIndex, userAnswer, isCorrect, "free-text");

    // Trigger callback
    onAnswer?.(slideId, qIndex, isCorrect);
  };

  return (
    <div className="space-y-8">
      {questions.map((q, qIndex) => {
        const questionType = q.questionType || "multiple-choice";

        return (
          <div key={qIndex} className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">
              {qIndex + 1}. {q.question}
            </h3>

            {questionType === "multiple-choice" && q.options && (
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
                    optionClasses +=
                      "border-success bg-success/10 quiz-correct";
                  } else if (selected && !isCorrect) {
                    optionClasses +=
                      "border-destructive bg-destructive/10 quiz-wrong";
                  } else if (isCorrect) {
                    optionClasses += "border-success bg-success/5";
                  } else {
                    optionClasses += "border-border opacity-50";
                  }

                  return (
                    <button
                      key={opt.label}
                      className={optionClasses}
                      onClick={() =>
                        handleSelect(qIndex, opt.label, opt.correct)
                      }
                      disabled={isRevealed}
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-sm text-secondary-foreground">
                        {opt.label.toUpperCase()}
                      </span>
                      <span className="text-left font-medium text-foreground">
                        {opt.text}
                      </span>
                      {isRevealed && selected && isCorrect && (
                        <FiCheckCircle
                          className="ml-auto text-success flex-shrink-0"
                          size={22}
                        />
                      )}
                      {isRevealed && selected && !isCorrect && (
                        <FiXCircle
                          className="ml-auto text-destructive flex-shrink-0"
                          size={22}
                        />
                      )}
                      {isRevealed && !selected && isCorrect && (
                        <FiCheckCircle
                          className="ml-auto text-success flex-shrink-0 opacity-60"
                          size={22}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {questionType === "free-text" && (
              <div className="space-y-3">
                {!revealed[qIndex] ? (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder={q.placeholder || "Ketik jawaban di sini..."}
                      value={textInputs[qIndex] || ""}
                      onChange={(e) =>
                        setTextInputs((prev) => ({
                          ...prev,
                          [qIndex]: e.target.value,
                        }))
                      }
                      className="flex-1"
                      disabled={revealed[qIndex]}
                    />
                    <Button
                      onClick={() => handleTextSubmit(qIndex, q)}
                      disabled={!textInputs[qIndex]?.trim() || revealed[qIndex]}
                    >
                      Submit
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg border-2 border-primary bg-primary/5">
                    <div className="flex items-start gap-3">
                      <FiCheckCircle
                        className="text-primary flex-shrink-0 mt-1"
                        size={20}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          Jawaban Anda:
                        </p>
                        <p className="font-medium text-foreground">
                          {answers[qIndex]}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {revealed[qIndex] && q.explanation && (
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-primary font-medium">
                  💡 {q.explanation}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuizSlide;
