import { meetings, getMeetingId } from "@/data/meetings";
import { useNavigate } from "react-router-dom";
import {
  FiMonitor,
  FiChevronRight,
  FiClock,
  FiLayers,
  FiCheckCircle,
  FiLogOut,
  FiUser,
  FiLock,
} from "react-icons/fi";
import { authAPI, meetingAPI } from "@/services/api";
import { useQuizStore } from "@/stores/quizStore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface MeetingStatus {
  isCompleted: boolean;
  percentage: number;
  durationMinutes: number;
  totalQuestions: number;
  correctAnswers: number;
  lastSlideIndex: number;
  completedAt: string;
}

const MeetingSelect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clearAll } = useQuizStore();
  const user = authAPI.getCurrentUser();
  const [meetingsStatus, setMeetingsStatus] = useState<
    Record<string, MeetingStatus>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMeetingsStatus = async () => {
      setIsLoading(true);
      try {
        const status = await meetingAPI.getAllMeetingsStatus();

        // Convert integer keys to string meeting IDs
        // API returns: { 1: {...}, 2: {...} }
        // Convert to: { "pertemuan-1": {...}, "pertemuan-2": {...} }
        const convertedStatus: Record<string, MeetingStatus> = {};
        Object.keys(status).forEach((key) => {
          const meetingNumber = parseInt(key);
          const meetingId = getMeetingId(meetingNumber);
          convertedStatus[meetingId] = status[key];
        });

        setMeetingsStatus(convertedStatus);
      } catch (error) {
        console.error("Failed to load meetings status:", error);
        toast({
          title: "Gagal memuat data",
          description: "Tidak dapat memuat status pertemuan",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMeetingsStatus();
  }, [toast]);

  const handleLogout = () => {
    clearAll(); // Clear store sebelum logout
    authAPI.logout();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem",
    });
    navigate("/login");
  };

  // Helper function untuk format tanggal
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Check if meeting is within time window (opened and not closed)
  const isMeetingOpenByTime = (
    meeting: (typeof meetings)[0],
  ): {
    isOpen: boolean;
    reason?: "not-yet-open" | "already-closed";
    openDate?: string;
    closeDate?: string;
  } => {
    const now = new Date();

    if (meeting.openedAt) {
      const openDate = new Date(meeting.openedAt);
      if (now < openDate) {
        return {
          isOpen: false,
          reason: "not-yet-open",
          openDate: meeting.openedAt,
        };
      }
    }

    if (meeting.closedAt) {
      const closeDate = new Date(meeting.closedAt);
      if (now > closeDate) {
        return {
          isOpen: false,
          reason: "already-closed",
          closeDate: meeting.closedAt,
        };
      }
    }

    return { isOpen: true };
  };

  // Check if a meeting is unlocked (can be accessed)
  const isMeetingUnlocked = (
    meetingNumber: number,
  ): {
    unlocked: boolean;
    reason?:
      | "previous-incomplete"
      | "not-yet-open"
      | "already-closed"
      | "no-access";
    message?: string;
  } => {
    const meeting = meetings.find((m) => m.number === meetingNumber);
    if (!meeting) return { unlocked: false, reason: "no-access" };

    // Check time restrictions first
    const timeCheck = isMeetingOpenByTime(meeting);
    if (!timeCheck.isOpen) {
      if (timeCheck.reason === "not-yet-open" && timeCheck.openDate) {
        return {
          unlocked: false,
          reason: "not-yet-open",
          message: `Dibuka pada: ${formatDate(timeCheck.openDate)}`,
        };
      }
      if (timeCheck.reason === "already-closed" && timeCheck.closeDate) {
        return {
          unlocked: false,
          reason: "already-closed",
          message: `Ditutup pada: ${formatDate(timeCheck.closeDate)}`,
        };
      }
    }

    // Pertemuan 1 always accessible if time is OK
    if (meetingNumber === 1) return { unlocked: true };

    // Check if previous meeting is completed
    const previousMeeting = meetings.find(
      (m) => m.number === meetingNumber - 1,
    );
    if (!previousMeeting) return { unlocked: false, reason: "no-access" };

    const previousStatus = meetingsStatus[previousMeeting.number];
    if (!previousStatus?.isCompleted) {
      return {
        unlocked: false,
        reason: "previous-incomplete",
        message: `Selesaikan ${previousMeeting.title} terlebih dahulu`,
      };
    }

    return { unlocked: true };
  };

  const handleMeetingClick = (meeting: (typeof meetings)[0]) => {
    const accessCheck = isMeetingUnlocked(meeting.number);

    if (!accessCheck.unlocked) {
      let title = "Pertemuan Terkunci";
      let description =
        accessCheck.message || "Tidak dapat mengakses pertemuan ini.";

      if (accessCheck.reason === "not-yet-open") {
        title = "Belum Dibuka";
        description = accessCheck.message || "Pertemuan belum dibuka.";
      } else if (accessCheck.reason === "already-closed") {
        title = "Sudah Ditutup";
        description = accessCheck.message || "Pertemuan sudah ditutup.";
      }

      toast({
        title,
        description,
        variant: "destructive",
      });
      return;
    }

    navigate(`/${meeting.id}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <FiMonitor size={20} className="text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm sm:text-base font-extrabold text-foreground leading-tight truncate">
                INFORMATION AND COMMUNICATION TECHNOLOGY (ICT)
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">
                Guided Self Learning
              </p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Desktop: show name & nim; Mobile: hide text and keep icons compact */}
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <FiUser size={14} />
                <span className="truncate max-w-[12rem]">
                  {user?.name || "User"}
                </span>
              </p>
              <p className="text-xs text-muted-foreground truncate max-w-[12rem]">
                {user?.nim}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile: small user icon with tooltip (title) */}
              <button
                className="sm:hidden p-2 rounded-md hover:bg-accent/10"
                title={user?.name || "User"}
                aria-label="user"
                type="button"
              >
                <FiUser size={16} />
              </button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Logout"
                className="hover:text-destructive"
              >
                <FiLogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <h2 className="text-2xl font-extrabold text-foreground mb-6">
          Pilih Pertemuan
        </h2>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Memuat data pertemuan...
          </div>
        ) : (
          <div className="space-y-4">
            {meetings.map((m) => {
              const status = meetingsStatus[m.number];
              const isCompleted = status?.isCompleted || false;
              const accessCheck = isMeetingUnlocked(m.number);
              const isUnlocked = accessCheck.unlocked;
              const isLocked = !isUnlocked;

              // Determine lock reason for UI
              let lockReason = "";
              let lockIcon = (
                <FiLock size={14} className="text-muted-foreground" />
              );
              let lockBadgeColor =
                "bg-muted border-border text-muted-foreground";

              if (accessCheck.reason === "not-yet-open") {
                lockReason = "Belum Dibuka";
                lockIcon = <FiClock size={14} className="text-amber-600" />;
                lockBadgeColor = "bg-amber-50 border-amber-300 text-amber-700";
              } else if (accessCheck.reason === "already-closed") {
                lockReason = "Ditutup";
                lockIcon = <FiLock size={14} className="text-red-600" />;
                lockBadgeColor = "bg-red-50 border-red-300 text-red-700";
              } else if (accessCheck.reason === "previous-incomplete") {
                lockReason = "Terkunci";
                lockIcon = (
                  <FiLock size={14} className="text-muted-foreground" />
                );
                lockBadgeColor = "bg-muted border-border text-muted-foreground";
              }

              return (
                <button
                  key={m.id}
                  onClick={() => handleMeetingClick(m)}
                  disabled={isLocked}
                  className={`w-full text-left p-5 rounded-2xl bg-card border transition-all duration-200 group relative ${
                    isLocked
                      ? "border-border opacity-60 cursor-not-allowed"
                      : "border-border hover:border-primary/50 hover:shadow-md"
                  }`}
                >
                  {/* Completed Badge */}
                  {isCompleted && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/20">
                      <FiCheckCircle size={14} className="text-success" />
                      <span className="text-xs font-bold text-success">
                        {status.percentage}%
                      </span>
                    </div>
                  )}

                  {/* Locked Badge */}
                  {isLocked && (
                    <div
                      className={`absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full ${lockBadgeColor}`}
                    >
                      {lockIcon}
                      <span className="text-xs font-bold">{lockReason}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <span
                      className={`text-3xl ${isLocked ? "opacity-50" : ""}`}
                    >
                      {m.icon}
                    </span>
                    <div className="flex-1 min-w-0 pr-16">
                      <h3
                        className={`text-lg font-extrabold transition-colors ${
                          isLocked
                            ? "text-muted-foreground"
                            : "text-foreground group-hover:text-primary"
                        }`}
                      >
                        {m.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        {m.subtitle}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FiClock size={12} /> {m.duration} menit
                        </span>
                        <span className="flex items-center gap-1">
                          <FiLayers size={12} /> {m.slides.length} slide
                        </span>
                        {isCompleted && status && (
                          <span className="flex items-center gap-1 text-success font-semibold">
                            ⏱️ Selesai dalam {status.durationMinutes} menit
                          </span>
                        )}
                        {isLocked && accessCheck.message && (
                          <span className="flex items-center gap-1 font-semibold text-amber-600">
                            {accessCheck.message}
                          </span>
                        )}
                      </div>
                    </div>
                    {isUnlocked && (
                      <FiChevronRight
                        size={20}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default MeetingSelect;
