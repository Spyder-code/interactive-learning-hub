import { meetings, mergeMeetingDefinitions } from "@/data/meetings";
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
  FiClipboard,
  FiUpload,
  FiEye,
} from "react-icons/fi";
import { authAPI, getUploadUrl, meetingAPI } from "@/services/api";
import { useQuizStore } from "@/stores/quizStore";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  formatJakartaDate,
  checkTimeWindow,
} from "@/lib/timezone";

interface MeetingStatus {
  isCompleted: boolean;
  percentage: number;
  durationMinutes: number;
  totalQuestions: number;
  correctAnswers: number;
  lastSlideIndex: number;
  completedAt: string;
}

interface AttendanceStatus {
  isPresent: boolean;
  fileName?: string | null;
  fileSize?: number | null;
  fileType?: string | null;
  filePath?: string | null;
  uploadedAt?: string | null;
  source?: string | null;
}

const MeetingSelect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clearAll } = useQuizStore();
  const user = authAPI.getCurrentUser();
  const [meetingsStatus, setMeetingsStatus] = useState<
    Record<string, MeetingStatus>
  >({});
  const [attendances, setAttendances] = useState<Record<string, AttendanceStatus>>({});
  const [meetingList, setMeetingList] = useState(meetings);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingAttendance, setUploadingAttendance] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [definitions, status, att] = await Promise.all([
          meetingAPI.getMeetingDefinitions(),
          meetingAPI.getAllMeetingsStatus(),
          meetingAPI.getMyAttendances()
        ]);

        setMeetingList(mergeMeetingDefinitions(definitions));
        setMeetingsStatus(status);
        setAttendances(att);
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

    // Load data on initial mount
    loadData();

    // Bug fix #1: Re-fetch status whenever the user returns to this tab
    // (e.g. after completing a meeting in another route/tab) so completion
    // badges update immediately without requiring logout/login.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
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

  // Helper function untuk format tanggal (Asia/Jakarta)
  const formatDate = formatJakartaDate;

  // Check if meeting is within time window (opened and not closed) — Asia/Jakarta
  const isMeetingOpenByTime = (
    meeting: (typeof meetingList)[0],
  ): {
    isOpen: boolean;
    reason?: "not-yet-open" | "already-closed";
    openDate?: string;
    closeDate?: string;
  } => {
    return checkTimeWindow(meeting.openedAt, meeting.closedAt);
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
    const meeting = meetingList.find((m) => m.number === meetingNumber);
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
    const previousMeeting = meetingList.find(
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

  const handleMeetingClick = (meeting: (typeof meetingList)[0]) => {
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

  const getAttendanceCount = () =>
    Object.values(attendances).filter((attendance) => attendance?.isPresent)
      .length;

  const formatFileSize = (size?: number | null) => {
    if (!size) return "";
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  };

  const getAttendanceWindow = (
    meeting: (typeof meetingList)[0],
  ): {
    isOpen: boolean;
    label: string;
    openedLabel: string;
    closedLabel: string;
    tone: "open" | "waiting" | "closed";
  } => {
    const windowCheck = checkTimeWindow(
      meeting.attendanceOpenedAt,
      meeting.attendanceClosedAt,
    );
    const openedLabel = meeting.attendanceOpenedAt
      ? formatDate(meeting.attendanceOpenedAt)
      : "Tidak dibatasi";
    const closedLabel = meeting.attendanceClosedAt
      ? formatDate(meeting.attendanceClosedAt)
      : "Tidak dibatasi";

    if (!windowCheck.isOpen) {
      if (windowCheck.reason === "not-yet-open") {
        return {
          isOpen: false,
          label: `Dibuka ${formatDate(meeting.attendanceOpenedAt)}`,
          openedLabel,
          closedLabel,
          tone: "waiting",
        };
      }
      if (windowCheck.reason === "already-closed") {
        return {
          isOpen: false,
          label: `Ditutup ${formatDate(meeting.attendanceClosedAt)}`,
          openedLabel,
          closedLabel,
          tone: "closed",
        };
      }
    }

    if (meeting.attendanceClosedAt) {
      return {
        isOpen: true,
        label: `Terbuka sampai ${formatDate(meeting.attendanceClosedAt)}`,
        openedLabel,
        closedLabel,
        tone: "open",
      };
    }

    if (meeting.attendanceOpenedAt) {
      return {
        isOpen: true,
        label: `Dibuka sejak ${formatDate(meeting.attendanceOpenedAt)}`,
        openedLabel,
        closedLabel,
        tone: "open",
      };
    }

    return {
      isOpen: true,
      label: "Absensi terbuka",
      openedLabel,
      closedLabel,
      tone: "open",
    };
  };

  const handleAttendanceUpload = async (meetingNumber: number, file?: File) => {
    if (!file) return;

    try {
      setUploadingAttendance(meetingNumber);
      const result = await meetingAPI.uploadAttendance(meetingNumber, file);

      setAttendances((current) => ({
        ...current,
        [meetingNumber]: result.attendance,
      }));

      toast({
        title: "Absensi tersimpan",
        description: `Screenshot Zoom Pertemuan ${meetingNumber} berhasil diupload`,
      });
    } catch (error: any) {
      toast({
        title: "Gagal menyimpan absensi",
        description: error.message || "Pastikan file berupa gambar dan jadwal absensi masih dibuka.",
        variant: "destructive",
      });
    } finally {
      setUploadingAttendance(null);
    }
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-foreground">
            Pilih Pertemuan
          </h2>
          {!isLoading && (
            <div className="mt-4 sm:mt-0 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Absensi</span>
                <span className="font-bold text-primary">{getAttendanceCount()} / 20</span>
              </div>
              <div className="w-px h-8 bg-primary/20"></div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Nilai Akhir</span>
                <span className="font-bold text-primary">
                  {(() => {
                    const getAvg = (start: number, end: number) => {
                      let sum = 0;
                      const expectedCount = end - start + 1;
                      for (let i = start; i <= end; i++) {
                          const m = meetingsStatus[i];
                          if (m && m.isCompleted) sum += m.percentage;
                      }
                      return sum / expectedCount;
                    };
                    const getExact = (id: number) => {
                      const m = meetingsStatus[id];
                      return m && m.isCompleted ? m.percentage : 0;
                    };
                    const score = (
                      (getAvg(1, 5) * 0.10) +
                      (getAvg(6, 11) * 0.10) +
                      (getAvg(12, 14) * 0.10) +
                      (getAvg(15, 16) * 0.10) +
                      (getAvg(17, 18) * 0.10) +
                      (getExact(19) * 0.10) +
                      (getExact(20) * 0.30) +
                      ((Math.min(getAttendanceCount(), 20) / 20) * 10)
                    );
                    return score.toFixed(1);
                  })()}
                </span>
              </div>
            </div>
          )}
        </div>

        <Tabs defaultValue="meeting" className="space-y-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="meeting">
              <FiLayers className="mr-2" size={15} />
              Meeting
            </TabsTrigger>
            <TabsTrigger value="absensi">
              <FiClipboard className="mr-2" size={15} />
              Absensi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meeting" className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Memuat data pertemuan...
              </div>
            ) : (
              <div className="space-y-4">
            {meetingList.map((m) => {
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
          </TabsContent>

          <TabsContent value="absensi" className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Memuat data absensi...
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg border bg-card px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      Status Absensi
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Kehadiran dihitung dari screenshot Zoom yang berhasil diupload.
                    </p>
                  </div>
                  <span className={`w-fit text-xs font-semibold px-2.5 py-1 rounded-full ${
                    getAttendanceCount() >= 14
                      ? "bg-success/15 text-success"
                      : getAttendanceCount() >= 10
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-destructive/10 text-destructive"
                  }`}>
                    {getAttendanceCount()}/20 Hadir
                  </span>
                </div>

                {meetingList.map((meeting) => {
                  const attendance = attendances[meeting.number];
                  const isPresent = attendance?.isPresent === true;
                  const isUploading = uploadingAttendance === meeting.number;
                  const proofUrl = getUploadUrl(attendance?.filePath);
                  const windowStatus = getAttendanceWindow(meeting);
                  const canUpload = windowStatus.isOpen && !isUploading;

                  return (
                    <div
                      key={`attendance-${meeting.id}`}
                      className={`w-full p-5 rounded-2xl bg-card border transition-colors ${
                        isPresent
                          ? "border-success/30"
                          : "border-border"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <span className="text-3xl shrink-0">{meeting.icon}</span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-extrabold text-foreground">
                                {meeting.title}
                              </h3>
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                isPresent
                                  ? "bg-success/10 text-success"
                                  : "bg-muted text-muted-foreground"
                              }`}>
                                {isPresent ? "Hadir" : "Belum Hadir"}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">
                              {meeting.subtitle}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                              <div className="rounded-lg border bg-muted/20 px-3 py-2">
                                <p className="text-[11px] font-semibold uppercase text-muted-foreground">
                                  Absensi Dibuka
                                </p>
                                <p className="text-xs font-bold text-foreground mt-0.5">
                                  {windowStatus.openedLabel}
                                </p>
                              </div>
                              <div className="rounded-lg border bg-muted/20 px-3 py-2">
                                <p className="text-[11px] font-semibold uppercase text-muted-foreground">
                                  Absensi Sampai
                                </p>
                                <p className="text-xs font-bold text-foreground mt-0.5">
                                  {windowStatus.closedLabel}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className={`font-semibold ${
                                windowStatus.tone === "open"
                                  ? "text-success"
                                  : windowStatus.tone === "waiting"
                                    ? "text-amber-600"
                                    : "text-destructive"
                              }`}>
                                {windowStatus.label}
                              </span>
                              {attendance?.uploadedAt && (
                                <span>
                                  Upload: {formatDate(attendance.uploadedAt)}
                                </span>
                              )}
                              {attendance?.fileSize && (
                                <span>{formatFileSize(attendance.fileSize)}</span>
                              )}
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <input
                                id={`attendance-upload-${meeting.number}`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={!canUpload}
                                onChange={(event) => {
                                  handleAttendanceUpload(
                                    meeting.number,
                                    event.target.files?.[0],
                                  );
                                  event.target.value = "";
                                }}
                              />
                              <label
                                htmlFor={`attendance-upload-${meeting.number}`}
                                className={`inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold transition-colors ${
                                  canUpload
                                    ? "cursor-pointer bg-background hover:border-primary hover:text-primary"
                                    : "pointer-events-none opacity-50"
                                }`}
                              >
                                <FiUpload size={14} />
                                {isUploading ? "Mengupload..." : isPresent ? "Ganti Bukti" : "Upload Bukti"}
                              </label>
                              {proofUrl && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(proofUrl, "_blank")}
                                >
                                  <FiEye className="mr-2" size={14} />
                                  Lihat Bukti
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="w-full sm:w-40 h-28 rounded-lg border bg-muted/30 overflow-hidden flex items-center justify-center shrink-0">
                          {proofUrl ? (
                            <button
                              type="button"
                              className="w-full h-full"
                              onClick={() => window.open(proofUrl, "_blank")}
                              title={attendance?.fileName || "Bukti absensi"}
                            >
                              <img
                                src={proofUrl}
                                alt={attendance?.fileName || `Bukti absensi ${meeting.title}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ) : (
                            <div className="text-center px-3">
                              <FiClipboard className="mx-auto text-muted-foreground" size={22} />
                              <p className="mt-2 text-xs text-muted-foreground">
                                Belum ada bukti
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MeetingSelect;
