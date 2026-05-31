import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { meetings, mergeMeetingDefinitions } from "@/data/meetings";
import SlideProgress from "@/components/SlideProgress";
import SlideContent from "@/components/SlideContent";
import SlideTimer from "@/components/SlideTimer";
import { useQuizStoreWithAPI } from "@/hooks/useQuizStoreWithAPI";
import { authAPI, meetingAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const [meetingList, setMeetingList] = useState(meetings);
  const meeting = meetingList.find((m) => m.id === meetingId) || meetingList[0];
  const slides = meeting.slides;
  const user = authAPI.getCurrentUser();

  const [current, setCurrent] = useState(0);
  const {
    getQuizResults,
    isTasksCompleted,
    isQuizCompleted,
    updateMaxSlideReached,
    updateCurrentSlideIndex,
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
    lastSlideIndex,
    saveAnswer,
    getAnswer,
    isAnswered,
  } = useQuizStoreWithAPI(meetingId || "");
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });
  const [meetingHistoryInfo, setMeetingHistoryInfo] = useState<{
    percentage: number;
    completedAt: number;
    durationMinutes: number;
  } | null>(null);
  const slide = slides[current];

  useEffect(() => {
    const loadMeetingDefinitions = async () => {
      try {
        const definitions = await meetingAPI.getMeetingDefinitions();
        setMeetingList(mergeMeetingDefinitions(definitions));
      } catch (error) {
        console.error("Failed to load meeting definitions:", error);
      }
    };

    loadMeetingDefinitions();
  }, []);

  const handleLogout = () => {
    clearAll(); // Clear store sebelum logout
    authAPI.logout();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem",
    });
    navigate("/login");
  };

  // Check if meeting is unlocked (sequential access control)
  useEffect(() => {
    const checkMeetingAccess = async () => {
      if (!meetingId || isLoading) return;

      // Find the meeting number
      const currentMeeting = meetingList.find((m) => m.id === meetingId);
      if (!currentMeeting) return;

      // Check time restrictions first
      const now = new Date();

      if (currentMeeting.openedAt) {
        const openDate = new Date(currentMeeting.openedAt);
        if (now < openDate) {
          toast({
            title: "Pertemuan Belum Dibuka",
            description: `${currentMeeting.title} akan dibuka pada ${openDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}.`,
            variant: "destructive",
          });
          navigate("/meetings");
          return;
        }
      }

      if (currentMeeting.closedAt) {
        const closeDate = new Date(currentMeeting.closedAt);
        if (now > closeDate) {
          toast({
            title: "Pertemuan Sudah Ditutup",
            description: `${currentMeeting.title} telah ditutup pada ${closeDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}.`,
            variant: "destructive",
          });
          navigate("/meetings");
          return;
        }
      }

      // Meeting 1 is always unlocked (if time is OK)
      if (currentMeeting.number === 1) return;

      // Check if previous meeting is completed
      const previousMeeting = meetingList.find(
        (m) => m.number === currentMeeting.number - 1,
      );
      if (!previousMeeting) return;

      try {
        const allStatus = await meetingAPI.getAllMeetingsStatus();
        const previousStatus = allStatus[previousMeeting.number];

        if (!previousStatus || !previousStatus.isCompleted) {
          toast({
            title: "Akses Ditolak",
            description: `Anda harus menyelesaikan ${previousMeeting.title} terlebih dahulu.`,
            variant: "destructive",
          });
          navigate("/meetings");
        }
      } catch (error) {
        console.error("Failed to check meeting access:", error);
      }
    };

    checkMeetingAccess();
  }, [meetingId, isLoading, navigate, toast, meetingList]);

  // Initialize slide 0 sebagai accessible saat pertama kali load
  useEffect(() => {
    if (meetingId && !isLoading) {
      // Hanya set slide 0 accessible jika belum ada progress dari backend
      const maxReached = getMaxSlideReached(meetingId);
      if (maxReached === 0 && lastSlideIndex === 0) {
        updateMaxSlideReached(0);
      }

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

      // Restore last visited slide position from API
      if (lastSlideIndex >= 0 && lastSlideIndex < slides.length) {
        setCurrent(lastSlideIndex);
      }
      // Note: setMeetingStartTime sudah di-handle di useQuizStoreWithAPI
      // dari data backend, jadi tidak perlu di-set lagi di sini
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingId, isLoading, lastSlideIndex]);

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

  const [isSaving, setIsSaving] = useState(false);

  const goNext = useCallback(async () => {
    if (isSaving) return; // Prevent multiple clicks

    // Check if current slide has quiz and if all questions are answered
    if (slide.quiz && slide.quiz.length > 0) {
      const quizCompleted = isQuizCompleted(slide.id, slide.quiz.length);
      if (!quizCompleted) {
        setAlertMessage({
          title: "Quiz Belum Lengkap",
          description:
            "Harap jawab semua pertanyaan quiz sebelum melanjutkan ke slide berikutnya!",
        });
        setAlertOpen(true);
        return;
      }
    }

    // Check if current slide requires upload and if all tasks are completed
    if (slide.requireUpload && slide.tasks) {
      const tasksCompleted = isTasksCompleted(slide.id, slide.tasks.length);
      if (!tasksCompleted) {
        setAlertMessage({
          title: "Upload Belum Lengkap",
          description:
            "Harap upload semua file yang diperlukan sebelum melanjutkan ke slide berikutnya!",
        });
        setAlertOpen(true);
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
        setAlertMessage({
          title: "Meeting Sudah Selesai",
          description:
            "Meeting ini sudah diselesaikan sebelumnya. Kembali ke halaman awal...",
        });
        setAlertOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
        return;
      }

      setIsSaving(true);
      // Jika belum pernah diselesaikan, simpan history (pertama kali)
      const quizSlides = slides.filter((s) => s.quiz && s.quiz.length > 0);
      let totalQuestions = 0;
      quizSlides.forEach((s) => {
        totalQuestions += s.quiz!.length;
      });

      const results = getQuizResults();
      const correctAnswers = Object.values(results).filter(Boolean).length;

      try {
        // Tampilkan pesan loading
        setAlertMessage({
          title: "Menyimpan...",
          description: "Sedang menyimpan hasil belajar Anda.",
        });
        setAlertOpen(true);

        // AWAIT Simpan history
        await saveMeetingHistory(current, totalQuestions, correctAnswers);

        // Tampilkan pesan sukses
        setAlertMessage({
          title: "Berhasil!",
          description:
            "Hasil belajar berhasil disimpan! Kembali ke halaman awal...",
        });

        // Navigate ke halaman awal setelah 1.5 detik
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        setIsSaving(false);
        setAlertMessage({
          title: "Gagal",
          description: "Terjadi kesalahan saat menyimpan hasil belajar.",
        });
      }
      return;
    }

    if (nextIndex < slides.length && meetingId) {
      updateMaxSlideReached(nextIndex);
    }
    const newIndex = Math.min(current + 1, slides.length - 1);
    setCurrent(newIndex);
    if (meetingId) {
      updateCurrentSlideIndex(newIndex);
    }
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
    updateCurrentSlideIndex,
    isSaving,
  ]);

  const goPrev = useCallback(() => {
    if (isSaving) return;
    const newIndex = Math.max(current - 1, 0);
    setCurrent(newIndex);
    if (meetingId) {
      updateCurrentSlideIndex(newIndex);
    }
  }, [current, meetingId, updateCurrentSlideIndex, isSaving]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Prevent keyboard shortcuts when user is typing in forms 
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT")
      ) {
        return;
      }

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
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-start md:items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => navigate("/")}
              className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors flex-shrink-0"
              aria-label="Home"
            >
              <FiHome size={18} className="text-secondary-foreground" />
            </button>

            <div className="min-w-0">
              <h1 className="text-sm font-extrabold text-foreground leading-tight uppercase truncate">
                {meeting.title}
              </h1>
              <p className="text-xs text-muted-foreground font-medium truncate">
                {meeting.subtitle}
              </p>

              {/* Compact completion info on mobile, extended on md+ */}
              {meetingHistoryInfo && (
                <div className="flex items-center gap-1.5 mt-1 text-xs">
                  <FiCheckCircle
                    size={12}
                    className="text-success flex-shrink-0"
                  />
                  <span className="font-semibold text-success">
                    {meetingHistoryInfo.percentage}% •{" "}
                    {meetingHistoryInfo.durationMinutes}m
                  </span>
                  <span className="text-muted-foreground hidden md:inline">
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

          {/* Desktop controls */}
          <div className="hidden md:flex items-center gap-3">
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

          {/* Mobile collapse menu (no extra JS) */}
          <details className="md:hidden w-full">
            <summary className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-secondary text-sm cursor-pointer">
              <span className="flex items-center gap-2">
                <FiUser size={14} />
                <span className="font-medium truncate">
                  {user?.name || "User"}
                </span>
              </span>
              <span className="text-muted-foreground">Menu</span>
            </summary>
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Timer</span>
                <div>
                  <SlideTimer
                    startDateTime={
                      meetingId ? getMeetingStartTime(meetingId) : undefined
                    }
                    completedDuration={meetingHistoryInfo?.durationMinutes}
                  />
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <div className="font-semibold">{user?.name || "User"}</div>
                <div>{user?.nim}</div>
              </div>
              <div className="pt-1">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </details>
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
                        if (meetingId) {
                          updateCurrentSlideIndex(i);
                        }
                      } else {
                        setAlertMessage({
                          title: "Slide Terkunci",
                          description:
                            "Anda harus menyelesaikan slide sebelumnya terlebih dahulu!",
                        });
                        setAlertOpen(true);
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
            <div
              key={current}
              className="bg-card rounded-2xl border border-border p-6 md:p-10 shadow-sm min-h-[400px]"
            >
              <SlideContent
                slide={slide}
                slides={slides}
                onQuizAnswer={handleQuizAnswer}
                quizResults={quizResults}
                isLastSlide={current === slides.length - 1}
                onSaveUpload={saveUpload}
                onRemoveUpload={removeUpload}
                saveAnswer={saveAnswer}
                getAnswer={getAnswer}
                isAnswered={isAnswered}
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

      {/* Alert Dialog */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <FiAlertCircle className="text-warning" />
              {alertMessage.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertMessage.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertOpen(false)}>
              Mengerti
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
