import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { meetings } from "@/data/meetings";
import SlideProgress from "@/components/SlideProgress";
import SlideContent from "@/components/SlideContent";
import SlideTimer from "@/components/SlideTimer";
import { useQuizStoreWithAPI } from "@/hooks/useQuizStoreWithAPI";
import { authAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMonitor,
  FiHome,
  FiAlertCircle,
  FiCheckCircle,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const meeting = meetings.find((m) => m.id === meetingId) || meetings[0];
  const slides = meeting.slides;
  const user = authAPI.getCurrentUser();

  const [current, setCurrent] = useState(0);
  const {
    getQuizResults,
    isTasksCompleted,
    isQuizCompleted,
    updateMaxSlideReached,
    canAccessSlide,
    getMaxSlideReached,
    saveMeetingHistory,
    getMeetingHistory,
    isMeetingCompleted,
    loadMeetingHistory,
    setMeetingStartTime,
    getMeetingStartTime,
    clearAll,
    isLoading,
    saveUpload,
    removeUpload,
  } = useQuizStoreWithAPI(meetingId || "");
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({});
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [meetingHistoryInfo, setMeetingHistoryInfo] = useState<{
    percentage: number;
    completedAt: number;
    durationMinutes: number;
  } | null>(null);
  const slide = slides[current];

  const handleLogout = () => {
    clearAll(); // Clear store sebelum logout
    authAPI.logout();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem",
    });
    navigate("/login");
  };

  // Initialize slide 0 sebagai accessible saat pertama kali load
  useEffect(() => {
    if (meetingId && !isLoading) {
      updateMaxSlideReached(0);

      // Load history jika meeting sudah pernah diselesaikan
      if (isMeetingCompleted(meetingId)) {
        loadMeetingHistory(meetingId);
        const history = getMeetingHistory(meetingId);
        if (history) {
          setMeetingHistoryInfo({
            percentage: history.percentage,
            completedAt: history.completedAt,
            durationMinutes: history.durationMinutes,
          });
        }
      }
      // Note: setMeetingStartTime sudah di-handle di useQuizStoreWithAPI
      // dari data backend, jadi tidak perlu di-set lagi di sini
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingId, isLoading]);

  // Load quiz results dari store saat component mount DAN setelah data di-load dari backend
  useEffect(() => {
    if (!isLoading) {
      setQuizResults(getQuizResults());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleQuizAnswer = useCallback(
    (slideId: number, questionIndex: number, isCorrect: boolean) => {
      // Update local state untuk trigger re-render
      setQuizResults((prev) => ({
        ...prev,
        [`${slideId}-${questionIndex}`]: isCorrect,
      }));
    },
    [],
  );

  const goNext = useCallback(() => {
    // Check if current slide has quiz and if all questions are answered
    if (slide.quiz && slide.quiz.length > 0) {
      const quizCompleted = isQuizCompleted(slide.id, slide.quiz.length);
      if (!quizCompleted) {
        setWarningMessage(
          "⚠️ Harap jawab semua pertanyaan quiz sebelum melanjutkan ke slide berikutnya!",
        );
        setTimeout(() => setWarningMessage(""), 3000);
        return;
      }
    }

    // Check if current slide requires upload and if all tasks are completed
    if (slide.requireUpload && slide.tasks) {
      const tasksCompleted = isTasksCompleted(slide.id, slide.tasks.length);
      if (!tasksCompleted) {
        setWarningMessage(
          "⚠️ Harap upload semua file yang diperlukan sebelum melanjutkan ke slide berikutnya!",
        );
        setTimeout(() => setWarningMessage(""), 3000);
        return;
      }
    }

    const nextIndex = current + 1;

    // Jika ini adalah slide terakhir, cek apakah sudah pernah diselesaikan
    if (current === slides.length - 1 && meetingId) {
      // Cek apakah meeting sudah pernah diselesaikan
      const alreadyCompleted = isMeetingCompleted(meetingId);

      if (alreadyCompleted) {
        // Jika sudah pernah diselesaikan, langsung kembali ke home tanpa save lagi
        setWarningMessage(
          "ℹ️ Meeting ini sudah diselesaikan sebelumnya. Kembali ke halaman awal...",
        );
        setTimeout(() => {
          navigate("/");
        }, 1500);
        return;
      }

      // Jika belum pernah diselesaikan, simpan history (pertama kali)
      const quizSlides = slides.filter((s) => s.quiz && s.quiz.length > 0);
      let totalQuestions = 0;
      quizSlides.forEach((s) => {
        totalQuestions += s.quiz!.length;
      });

      const results = getQuizResults();
      const correctAnswers = Object.values(results).filter(Boolean).length;

      // Simpan history
      saveMeetingHistory(current, totalQuestions, correctAnswers);

      // Tampilkan pesan sukses
      setWarningMessage(
        "✅ Hasil belajar berhasil disimpan! Kembali ke halaman awal...",
      );

      // Navigate ke halaman awal setelah 1.5 detik
      setTimeout(() => {
        navigate("/");
      }, 1500);
      return;
    }

    if (nextIndex < slides.length && meetingId) {
      updateMaxSlideReached(nextIndex);
    }
    setCurrent((c) => Math.min(c + 1, slides.length - 1));
  }, [
    slide,
    isTasksCompleted,
    isQuizCompleted,
    slides,
    current,
    meetingId,
    updateMaxSlideReached,
    getQuizResults,
    saveMeetingHistory,
    navigate,
    isMeetingCompleted,
  ]);

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
            <button
              onClick={() => navigate("/")}
              className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <FiHome size={18} className="text-secondary-foreground" />
            </button>
            <div>
              <h1 className="text-sm font-extrabold text-foreground leading-tight uppercase">
                {meeting.title}
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                {meeting.subtitle}
              </p>
              {meetingHistoryInfo && (
                <div className="flex items-center gap-1.5 mt-1">
                  <FiCheckCircle size={12} className="text-success" />
                  <span className="text-xs font-semibold text-success">
                    Selesai • Skor {meetingHistoryInfo.percentage}% •{" "}
                    {meetingHistoryInfo.durationMinutes} menit
                  </span>
                  <span className="text-xs text-muted-foreground">
                    •{" "}
                    {new Date(
                      meetingHistoryInfo.completedAt,
                    ).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SlideTimer
              startDateTime={
                meetingId ? getMeetingStartTime(meetingId) : undefined
              }
              completedDuration={meetingHistoryInfo?.durationMinutes}
            />
            <div className="text-right">
              <p className="text-xs font-semibold text-foreground flex items-center justify-end gap-1.5">
                <FiUser size={12} />
                {user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground">{user?.nim}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Logout"
              className="hover:text-destructive h-9 w-9"
            >
              <FiLogOut size={16} />
            </Button>
          </div>
        </div>
      </header>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">
              Memuat data pertemuan...
            </p>
          </div>
        </div>
      )}

      {/* Main Content - Hidden when loading */}
      {!isLoading && (
        <>
          {/* Progress */}
          <div className="max-w-5xl mx-auto w-full px-4 pt-4">
            <SlideProgress current={current} total={slides.length} />
          </div>

          {/* Slide Selector (thumbnails) */}
          <div className="max-w-5xl mx-auto w-full px-4 pt-4">
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none p-2">
              {slides.map((s, i) => {
                const isAccessible = meetingId
                  ? canAccessSlide(meetingId, i)
                  : i === 0;
                const isClickable = isAccessible || i === 0;

                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      if (isClickable) {
                        setCurrent(i);
                      } else {
                        setWarningMessage(
                          "⚠️ Anda harus menyelesaikan slide sebelumnya terlebih dahulu!",
                        );
                        setTimeout(() => setWarningMessage(""), 3000);
                      }
                    }}
                    disabled={!isClickable}
                    className={`flex-shrink-0 w-10 h-10 rounded-lg text-xs font-bold transition-all duration-200 ${
                      i === current
                        ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                        : i < current
                          ? "bg-success/20 text-success"
                          : isAccessible
                            ? "bg-secondary text-muted-foreground hover:bg-secondary/80"
                            : "bg-secondary/50 text-muted-foreground/30 cursor-not-allowed"
                    }`}
                  >
                    {s.icon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
            {/* Warning Message */}
            {warningMessage && (
              <div className="mb-4 slide-enter">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-warning/10 border border-warning/30 text-warning">
                  <FiAlertCircle size={20} className="flex-shrink-0" />
                  <p className="text-sm font-semibold">{warningMessage}</p>
                </div>
              </div>
            )}

            <div
              key={current}
              className="bg-card rounded-2xl border border-border p-6 md:p-10 shadow-sm min-h-[400px]"
            >
              <SlideContent
                slide={slide}
                onQuizAnswer={handleQuizAnswer}
                quizResults={quizResults}
                isLastSlide={current === slides.length - 1}
                onSaveUpload={saveUpload}
                onRemoveUpload={removeUpload}
              />
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
                <FiChevronLeft size={18} />
                Sebelumnya
              </button>

              <span className="text-sm font-bold text-muted-foreground">
                {current + 1} / {slides.length}
              </span>

              <button
                onClick={goNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 bg-primary text-primary-foreground hover:opacity-90"
              >
                {current === slides.length - 1
                  ? meetingId && isMeetingCompleted(meetingId)
                    ? "Kembali ke Beranda"
                    : "Selesai & Simpan"
                  : "Selanjutnya"}
                <FiChevronRight size={18} />
              </button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;
