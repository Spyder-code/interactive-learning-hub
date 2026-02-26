import type { Slide } from "@/data/slides";
import QuizSlide from "./QuizSlide";
import ScoreSummary from "./ScoreSummary";
import { useEffect, useState } from "react";
import { useQuizStore } from "@/stores/quizStore";
import {
  FiCheckSquare,
  FiSquare,
  FiClock,
  FiAlertTriangle,
  FiBook,
  FiAward,
  FiUpload,
  FiCheck,
} from "react-icons/fi";

interface SlideContentProps {
  slide: Slide;
  slides: Slide[]; // All slides for score calculation
  onQuizAnswer?: (
    slideId: number,
    questionIndex: number,
    isCorrect: boolean,
  ) => void;
  quizResults?: Record<string, boolean>;
  isLastSlide?: boolean;
  onSaveUpload?: (
    slideId: number,
    taskIndex: number,
    file: File,
  ) => Promise<void>;
  onRemoveUpload?: (slideId: number, taskIndex: number) => Promise<void>;
  saveAnswer?: (
    slideId: number,
    questionIndex: number,
    selectedOption: string,
    isCorrect: boolean,
    questionType?: "multiple-choice" | "free-text",
  ) => void;
  getAnswer?: (slideId: number, questionIndex: number) => any;
  isAnswered?: (slideId: number, questionIndex: number) => boolean;
}

const typeConfig = {
  content: { color: "bg-primary", icon: FiBook, label: "Materi" },
  quiz: { color: "bg-accent", icon: FiAlertTriangle, label: "Quiz" },
  task: { color: "bg-success", icon: FiCheckSquare, label: "Tugas" },
  challenge: { color: "bg-warning", icon: FiAlertTriangle, label: "Challenge" },
};

const SlideContent = ({
  slide,
  slides,
  onQuizAnswer,
  quizResults,
  isLastSlide,
  onSaveUpload,
  onRemoveUpload,
  saveAnswer,
  getAnswer,
  isAnswered,
}: SlideContentProps) => {
  const config = typeConfig[slide.type];
  const Icon = config.icon;
  const { getUpload } = useQuizStore();
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<number, { name: string; size: number } | null>
  >({});
  const [isUploading, setIsUploading] = useState<Record<number, boolean>>({});
  const [activeUpload, setActiveUpload] = useState<number | null>(null);

  // Load uploaded files from store on mount or slide change
  useEffect(() => {
    if (slide.tasks && slide.requireUpload) {
      const files: Record<number, { name: string; size: number } | null> = {};
      slide.tasks.forEach((_, index) => {
        const upload = getUpload(slide.id, index);
        if (upload) {
          files[index] = { name: upload.fileName, size: upload.fileSize };
        }
      });
      setUploadedFiles(files);
    }
  }, [slide.id, slide.tasks, slide.requireUpload, getUpload]);

  const handleFileUpload = async (taskIndex: number, file: File | null) => {
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/pdf",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert(
          "Invalid file type. Only images and office files (Word, Excel, PowerPoint, PDF) are allowed.",
        );
        return;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
      }

      setIsUploading((prev) => ({ ...prev, [taskIndex]: true }));
      try {
        // Save to backend
        if (onSaveUpload) {
          await onSaveUpload(slide.id, taskIndex, file);
        }
        // Update local state for immediate UI feedback
        setUploadedFiles((prev) => ({
          ...prev,
          [taskIndex]: { name: file.name, size: file.size },
        }));
      } catch (error) {
        console.error("Failed to upload file:", error);
        alert("Failed to upload file. Please try again.");
      } finally {
        setIsUploading((prev) => ({ ...prev, [taskIndex]: false }));
      }
    } else {
      setIsUploading((prev) => ({ ...prev, [taskIndex]: true }));
      try {
        // Remove from backend
        if (onRemoveUpload) {
          await onRemoveUpload(slide.id, taskIndex);
        }
        // Update local state
        setUploadedFiles((prev) => {
          const newFiles = { ...prev };
          delete newFiles[taskIndex];
          return newFiles;
        });
      } catch (error) {
        console.error("Failed to remove file:", error);
        alert("Failed to remove file. Please try again.");
      } finally {
        setIsUploading((prev) => ({ ...prev, [taskIndex]: false }));
      }
    }
  };

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
            <FiClock size={14} />
            {slide.timer} menit
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground font-semibold mb-1">
        {slide.subtitle}
      </p>

      <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
        {/* <span className="mr-2">{slide.icon}</span> */}
        {slide.title}
      </h2>

      {/* Content paragraphs */}
      {slide.content && (
        <div className="space-y-2 mb-6">
          {slide.content.map((text, i) => (
            <p
              key={i}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              {text.split(/(\*\*[^*]+\*\*)/g).map((part, idx) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong
                    key={idx}
                    className="font-bold text-foreground text-primary"
                  >
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  part
                ),
              )}
            </p>
          ))}
        </div>
      )}

      {/* Hyperlink */}
      {slide.hyperlink && (
        <div className="mb-6">
          <a
            href={slide.hyperlink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
          >
            <FiUpload size={18} />
            <span>{slide.hyperlink.text}</span>
          </a>
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
              <FiCheckSquare
                size={20}
                className="text-success mt-0.5 flex-shrink-0"
              />
              <span className="font-medium text-foreground">
                {item.split(/(\*\*[^*]+\*\*)/g).map((part, idx) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={idx} className="font-bold text-primary">
                      {part.slice(2, -2)}
                    </strong>
                  ) : (
                    part
                  ),
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Tasks */}
      {slide.tasks && (
        <ul className="space-y-4 mb-6">
          {slide.tasks.map((task, i) => (
            <li
              key={i}
              className="flex flex-col gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                {uploadedFiles[i] ? (
                  <FiCheckSquare
                    size={20}
                    className="text-success mt-0.5 flex-shrink-0"
                  />
                ) : (
                  <FiSquare
                    size={20}
                    className="text-muted-foreground mt-0.5 flex-shrink-0"
                  />
                )}
                <span className="font-medium text-foreground flex-1">
                  {task}
                </span>
              </div>
              {slide.requireUpload && (
                <div
                  onPaste={(e) => {
                    e.preventDefault();
                    const items = e.clipboardData?.items;
                    if (items) {
                      for (let j = 0; j < items.length; j++) {
                        if (items[j].type.indexOf("image") !== -1) {
                          const file = items[j].getAsFile();
                          if (file) {
                            handleFileUpload(i, file);
                          }
                          break;
                        }
                      }
                    }
                  }}
                  onFocus={() => setActiveUpload(i)}
                  onBlur={() => setActiveUpload(null)}
                  tabIndex={0}
                  className={`ml-8 transition-all ${activeUpload === i ? "ring-2 ring-primary ring-offset-2 rounded-lg" : ""}`}
                >
                  <input
                    id={`file-upload-${slide.id}-${i}`}
                    type="file"
                    accept="image/*,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf"
                    onChange={(e) =>
                      handleFileUpload(i, e.target.files?.[0] || null)
                    }
                    className="hidden"
                    disabled={isUploading[i]}
                  />
                  <label
                    htmlFor={`file-upload-${slide.id}-${i}`}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                        activeUpload === i
                          ? "bg-primary text-primary-foreground border-2 border-primary shadow-md"
                          : "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
                      }`}
                    >
                      {isUploading[i] ? (
                        <>
                          <FiUpload size={16} className="animate-pulse" />
                          <span>Uploading...</span>
                        </>
                      ) : uploadedFiles[i] ? (
                        <>
                          <FiCheck size={16} />
                          <span className="truncate max-w-[200px]">
                            {uploadedFiles[i]?.name}
                          </span>
                        </>
                      ) : (
                        <>
                          <FiUpload size={16} />
                          <span>Upload File (Click or Ctrl+V)</span>
                        </>
                      )}
                    </div>
                  </label>
                  {uploadedFiles[i] && (
                    <p className="text-xs text-muted-foreground mt-1 ml-1">
                      File size:{" "}
                      {((uploadedFiles[i]?.size || 0) / 1024).toFixed(2)} KB
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Quiz */}
      {slide.quiz && (
        <QuizSlide
          questions={slide.quiz}
          slideId={slide.id}
          onAnswer={onQuizAnswer}
          saveAnswer={saveAnswer}
          getAnswer={getAnswer}
          isAnswered={isAnswered}
        />
      )}

      {/* Score Summary on last slide */}
      {isLastSlide && quizResults && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <FiAward size={20} className="text-warning" />
            <h3 className="text-xl font-extrabold text-foreground">
              Skor Akhir Kamu
            </h3>
          </div>
          <ScoreSummary quizResults={quizResults} slides={slides} />
        </div>
      )}

      {/* Note */}
      {slide.note && (
        <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/20">
          <p className="text-sm font-semibold text-accent">{slide.note}</p>
        </div>
      )}
    </div>
  );
};

export default SlideContent;
