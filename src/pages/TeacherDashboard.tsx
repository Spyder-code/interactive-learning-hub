import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, teacherAPI } from "@/services/api";
import { meetings, getMeetingId } from "@/data/meetings";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import {
  FiUsers,
  FiBarChart2,
  FiBookOpen,
  FiLogOut,
  FiTrendingUp,
  FiActivity,
  FiCheckCircle,
  FiCircle,
  FiFileText,
  FiUpload,
  FiArrowLeft,
  FiEye,
  FiDownload,
  FiRefreshCw,
  FiSearch,
  FiClipboard,
  FiUserCheck,
  FiUserX,
  FiSettings,
} from "react-icons/fi";

interface User {
  id: number;
  nim: string;
  name: string;
  role: string;
  is_active: number;
  created_at: string;
}

interface Student {
  id: number;
  nim: string;
  name: string;
  created_at: string;
  total_meetings?: number;
  completed_meetings?: number;
  avg_score?: number;
  final_score?: number;
  score_breakdown?: {
    score1to5: number;
    score6to11: number;
    score12to14: number;
    score15to16: number;
    score17to18: number;
    score19: number;
    score20: number;
    attendanceScore: number;
  };
  attendances?: { meeting_id: number; is_present: boolean }[];
  meeting_progress?: {
    meeting_id: number;
    percentage: number;
    is_completed: number;
  }[];
}

interface Meeting {
  id: number;
  meeting_id: number; // Integer from database
  student_name: string;
  student_nim: string;
  start_time: string;
  end_time?: string;
  duration_minutes?: number;
  last_slide_index: number;
  total_questions: number;
  correct_answers: number;
  percentage: number;
  is_completed: boolean;
}

interface QuizAnswer {
  id: number;
  slide_id: number;
  question_index: number;
  selected_option: string;
  is_correct: boolean;
  question_type: string;
  timestamp: string;
}

interface TaskUpload {
  id: number;
  slide_id: number;
  task_index: number;
  file_name: string;
  file_size: number;
  file_type: string;
  file_path: string;
  timestamp: string;
}

interface SlideProgress {
  id: number;
  slide_index: number;
  max_slide_reached: number;
  timestamp: string;
}

interface MeetingDetail {
  meeting: Meeting;
  quizAnswers: QuizAnswer[];
  taskUploads: TaskUpload[];
  slideProgress: SlideProgress[];
}

interface Statistics {
  totalStudents: number;
  totalMeetings: number;
  completedMeetings: number;
  avgScore: number;
  recentActivity: Array<{
    name: string;
    nim: string;
    meeting_id: number; // Integer from database
    percentage: number;
    updated_at: string;
  }>;
}

const TeacherDashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [absensiSearch, setAbsensiSearch] = useState("");
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentMeetings, setStudentMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [meetingDetail, setMeetingDetail] = useState<MeetingDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [recalculating, setRecalculating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<TaskUpload | null>(null);
  const [filePreviewOpen, setFilePreviewOpen] = useState(false);
  // Track which attendance cell is currently being saved: "studentId-meetingId"
  const [savingAttendance, setSavingAttendance] = useState<Set<string>>(
    new Set(),
  );
  // Track which user is being toggled: userId
  const [togglingUserId, setTogglingUserId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = authAPI.getCurrentUser();
    if (!user || user.role !== "teacher") {
      navigate("/login");
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load students summary
      const studentsData = await teacherAPI.getStudents();
      setStudents(studentsData);

      // Load statistics
      const statsData = await teacherAPI.getStatistics();
      setStatistics(statsData);
    } catch (error) {
      console.error("Load data error:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStudentMeetings = async (studentId: number) => {
    try {
      const data = await teacherAPI.getStudentMeetings(studentId);
      setStudentMeetings(data);
    } catch (error) {
      console.error("Load meetings error:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data meeting",
        variant: "destructive",
      });
    }
  };

  const loadMeetingDetail = async (
    studentId: number,
    meetingNumber: number,
  ) => {
    try {
      setLoadingDetail(true);

      const data = await teacherAPI.getStudentMeetingDetail(
        studentId,
        meetingNumber,
      );

      // Debug logging
      console.log("=== Meeting Detail Debug ===");
      console.log("Meeting Number:", meetingNumber);
      console.log("Student ID:", studentId);
      console.log("Meeting Data:", data.meeting);
      console.log("Quiz Answers Count:", data.quizAnswers.length);
      console.log("Quiz Answers:", data.quizAnswers);
      console.log("Task Uploads Count:", data.taskUploads.length);
      console.log("Task Uploads:", data.taskUploads);
      console.log("Slide Progress:", data.slideProgress);
      console.log("=========================");

      setMeetingDetail(data);
    } catch (error) {
      console.error("Load meeting detail error:", error);
      toast({
        title: "Error",
        description: "Gagal memuat detail meeting",
        variant: "destructive",
      });
    } finally {
      setLoadingDetail(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const usersData = await teacherAPI.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Load users error:", error);
      toast({
        title: "Error",
        description: "Gagal memuat data pengguna",
        variant: "destructive",
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const toggleUserActive = async (
    userId: number,
    currentActiveStatus: number,
  ) => {
    try {
      setTogglingUserId(userId);
      const newStatus = currentActiveStatus === 1 ? false : true;
      await teacherAPI.toggleUserActive(userId, newStatus);

      // Update local state
      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, is_active: newStatus ? 1 : 0 } : u,
        ),
      );

      toast({
        title: "Sukses",
        description: `User berhasil ${newStatus ? "diaktifkan" : "dinonaktifkan"}`,
      });
    } catch (error: any) {
      console.error("Toggle user active error:", error);
      toast({
        title: "Error",
        description: error.message || "Gagal mengubah status user",
        variant: "destructive",
      });
    } finally {
      setTogglingUserId(null);
    }
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setSelectedMeeting(null);
    setMeetingDetail(null);
    loadStudentMeetings(student.id);
  };

  const handleViewMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    if (selectedStudent) {
      loadMeetingDetail(selectedStudent.id, meeting.meeting_id);
    }
  };

  const getTotalSlidesForMeeting = (
    meetingIdOrNumber: string | number,
  ): number => {
    // Convert integer meeting number to string meeting ID if needed
    const meetingId =
      typeof meetingIdOrNumber === "number"
        ? getMeetingId(meetingIdOrNumber)
        : meetingIdOrNumber;

    console.log(
      "Getting total slides for meeting:",
      meetingIdOrNumber,
      "->",
      meetingId,
    );
    const meeting = meetings.find((m) => m.id === meetingId);

    if (!meeting) {
      console.warn(
        `Meeting not found: ${meetingId}. Available meetings:`,
        meetings.map((m) => m.id),
      );
      // Fallback: try to match by number
      const meetingNumber =
        typeof meetingIdOrNumber === "number"
          ? meetingIdOrNumber
          : parseInt(meetingId.match(/\d+/)?.[0] || "0");

      if (meetingNumber > 0) {
        const meetingByNumber = meetings.find(
          (m) => m.number === meetingNumber,
        );
        if (meetingByNumber) {
          console.log(
            `Found meeting by number: ${meetingNumber}, slides count: ${meetingByNumber.slides.length}`,
          );
          return meetingByNumber.slides.length;
        }
      }
      return 20; // default fallback
    }

    console.log(
      `Meeting found: ${meeting.id}, slides count: ${meeting.slides.length}`,
    );
    return meeting.slides.length;
  };

  const handleBackToMeetings = () => {
    setSelectedMeeting(null);
    setMeetingDetail(null);
  };

  const handleRecalculateScore = async () => {
    if (!selectedMeeting || !meetingDetail) return;

    try {
      setRecalculating(true);

      // Get the meeting definition to find total questions
      const meetingId = getMeetingId(selectedMeeting.meeting_id);
      const meeting = meetings.find((m) => m.id === meetingId);

      if (!meeting) {
        toast({
          title: "Error",
          description: "Meeting definition tidak ditemukan",
          variant: "destructive",
        });
        return;
      }

      // Calculate total questions from all quiz slides
      const quizSlides = meeting.slides.filter(
        (s) => s.quiz && s.quiz.length > 0,
      );
      let totalQuestionsActual = 0;
      quizSlides.forEach((s) => {
        totalQuestionsActual += s.quiz!.length;
      });

      if (totalQuestionsActual === 0) {
        toast({
          title: "Error",
          description: "Meeting ini tidak memiliki soal quiz",
          variant: "destructive",
        });
        return;
      }

      // Call recalculate API
      const data = await teacherAPI.recalculateScore(
        meetingDetail.meeting.id,
        totalQuestionsActual,
      );

      toast({
        title: "Berhasil!",
        description: `Score berhasil direcalculate: ${data.data.percentageOld.toFixed(1)}% → ${data.data.percentageNew.toFixed(1)}%`,
      });

      // Reload meeting detail
      if (selectedStudent) {
        await loadMeetingDetail(selectedStudent.id, selectedMeeting.meeting_id);
        await loadStudentMeetings(selectedStudent.id);
        await loadData();
      }
    } catch (error) {
      console.error("Recalculate score error:", error);
      toast({
        title: "Error",
        description: "Gagal recalculate score",
        variant: "destructive",
      });
    } finally {
      setRecalculating(false);
    }
  };

  const handleDownloadDatabase = async () => {
    try {
      toast({
        title: "Mendownload...",
        description: "Sedang mengunduh file database.sqlite",
      });
      await teacherAPI.downloadDatabase();
      toast({
        title: "Berhasil!",
        description: "Database berhasil diunduh",
      });
    } catch (error) {
      console.error("Download database error:", error);
      toast({
        title: "Error",
        description: "Gagal mengunduh database",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    navigate("/login");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "-";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}j ${mins}m`;
    }
    return `${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Memuat data...</p>
        </div>
      </div>
    );
  }

  const user = authAPI.getCurrentUser();

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nim.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <FiBookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Teacher Dashboard</h1>
                <p className="text-sm text-muted-foreground">{user?.name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDownloadDatabase}>
                <FiDownload className="mr-2" />
                Download DB
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <FiLogOut className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Mahasiswa
                  </CardTitle>
                  <FiUsers className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {statistics.totalStudents}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Meeting
                  </CardTitle>
                  <FiBookOpen className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {statistics.totalMeetings}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Meeting Selesai
                  </CardTitle>
                  <FiBarChart2 className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {statistics.completedMeetings}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Rata-rata Skor
                  </CardTitle>
                  <FiTrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {statistics.avgScore.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs defaultValue="students" className="space-y-4">
          <TabsList>
            <TabsTrigger value="students">
              <FiUsers className="mr-2" />
              Daftar Mahasiswa
            </TabsTrigger>
            <TabsTrigger value="absensi">
              <FiClipboard className="mr-2" />
              Absensi
            </TabsTrigger>
            <TabsTrigger value="progress">
              <FiBarChart2 className="mr-2" />
              Progress Meeting
            </TabsTrigger>
            <TabsTrigger value="activity">
              <FiActivity className="mr-2" />
              Aktivitas Terkini
            </TabsTrigger>
            <TabsTrigger value="users">
              <FiSettings className="mr-2" />
              Manajemen User
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4">
            {selectedStudent ? (
              selectedMeeting && meetingDetail ? (
                // Detail Meeting View
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <FiFileText className="w-5 h-5" />
                            Detail Meeting: Pertemuan{" "}
                            {selectedMeeting.meeting_id}
                          </CardTitle>
                          <CardDescription>
                            {selectedStudent.name} ({selectedStudent.nim})
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRecalculateScore}
                            disabled={
                              recalculating || !selectedMeeting.is_completed
                            }
                            title={
                              !selectedMeeting.is_completed
                                ? "Meeting harus selesai dulu untuk recalculate"
                                : "Recalculate score berdasarkan total soal yang benar"
                            }
                          >
                            <FiRefreshCw
                              className={`mr-2 ${recalculating ? "animate-spin" : ""}`}
                            />
                            {recalculating ? "Syncing..." : "Sync Score"}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleBackToMeetings}
                          >
                            <FiArrowLeft className="mr-2" />
                            Kembali
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Status
                          </p>
                          <p className="font-semibold">
                            {selectedMeeting.is_completed ? (
                              <Badge variant="default">Selesai</Badge>
                            ) : (
                              <Badge variant="outline">Dalam Progress</Badge>
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Skor</p>
                          <p className="font-semibold text-lg">
                            {selectedMeeting.is_completed ? (
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={
                                    selectedMeeting.percentage > 100
                                      ? "destructive"
                                      : selectedMeeting.percentage >= 70
                                        ? "default"
                                        : "secondary"
                                  }
                                >
                                  {selectedMeeting.percentage.toFixed(1)}%
                                </Badge>
                                {selectedMeeting.percentage > 100 && (
                                  <span className="text-xs text-destructive">
                                    ⚠️ Perlu sync
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">
                                Belum selesai
                              </span>
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Durasi
                          </p>
                          <p className="font-semibold">
                            {formatDuration(selectedMeeting.duration_minutes)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Benar / Total Soal
                          </p>
                          <p className="font-semibold">
                            {selectedMeeting.is_completed
                              ? `${selectedMeeting.correct_answers} / ${selectedMeeting.total_questions}`
                              : "Belum selesai"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Slide Progress Checklist */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FiCheckCircle className="w-5 h-5" />
                        Progress Slide
                      </CardTitle>
                      <CardDescription>
                        Slide terakhir dicapai: Slide{" "}
                        {selectedMeeting.last_slide_index + 1} dari{" "}
                        {getTotalSlidesForMeeting(selectedMeeting.meeting_id)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loadingDetail ? (
                        <p className="text-center text-muted-foreground">
                          Memuat...
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {meetingDetail.slideProgress.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {Array.from(
                                {
                                  length: selectedMeeting.last_slide_index + 1,
                                },
                                (_, i) => i,
                              ).map((slideIndex) => (
                                <div
                                  key={slideIndex}
                                  className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                                >
                                  <Checkbox
                                    checked={true}
                                    className="pointer-events-none"
                                  />
                                  <div className="flex items-center gap-2">
                                    <FiCheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="font-medium">
                                      Slide {slideIndex + 1}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center text-muted-foreground py-4">
                              Belum ada progress slide
                            </p>
                          )}

                          {/* Remaining Slides */}
                          {selectedMeeting.last_slide_index <
                            getTotalSlidesForMeeting(
                              selectedMeeting.meeting_id,
                            ) -
                              1 && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-sm font-medium text-muted-foreground mb-3">
                                Slide yang Belum Dicapai (
                                {getTotalSlidesForMeeting(
                                  selectedMeeting.meeting_id,
                                ) -
                                  selectedMeeting.last_slide_index -
                                  1}{" "}
                                slide tersisa)
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Array.from(
                                  {
                                    length:
                                      getTotalSlidesForMeeting(
                                        selectedMeeting.meeting_id,
                                      ) -
                                      selectedMeeting.last_slide_index -
                                      1,
                                  },
                                  (_, i) =>
                                    selectedMeeting.last_slide_index + 1 + i,
                                ).map((slideIndex) => (
                                  <div
                                    key={slideIndex}
                                    className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30"
                                  >
                                    <Checkbox
                                      checked={false}
                                      disabled
                                      className="pointer-events-none"
                                    />
                                    <div className="flex items-center gap-2">
                                      <FiCircle className="w-4 h-4 text-muted-foreground" />
                                      <span className="text-muted-foreground">
                                        Slide {slideIndex + 1}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Quiz Answers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FiBookOpen className="w-5 h-5" />
                        Jawaban Quiz
                      </CardTitle>
                      <CardDescription>
                        Detail jawaban quiz yang telah dikerjakan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {meetingDetail.quizAnswers.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full">
                          {meetingDetail.quizAnswers.map((answer, index) => (
                            <AccordionItem
                              key={answer.id}
                              value={`item-${index}`}
                            >
                              <AccordionTrigger>
                                <div className="flex items-center gap-3">
                                  {answer.is_correct ? (
                                    <FiCheckCircle className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <FiCircle className="w-5 h-5 text-red-500" />
                                  )}
                                  <span>
                                    Slide {answer.slide_id} - Pertanyaan{" "}
                                    {answer.question_index + 1}
                                  </span>
                                  <Badge
                                    variant={
                                      answer.is_correct
                                        ? "default"
                                        : "destructive"
                                    }
                                  >
                                    {answer.is_correct ? "Benar" : "Salah"}
                                  </Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-2 pl-8">
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Tipe Pertanyaan:
                                    </p>
                                    <p className="font-medium">
                                      {answer.question_type ===
                                      "multiple-choice"
                                        ? "Pilihan Ganda"
                                        : "Isian Bebas"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Jawaban Dipilih:
                                    </p>
                                    <p className="font-medium">
                                      {answer.selected_option}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Waktu Dijawab:
                                    </p>
                                    <p className="font-medium">
                                      {formatDate(answer.timestamp)}
                                    </p>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : (
                        <p className="text-center text-muted-foreground py-8">
                          Belum ada jawaban quiz
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Task Uploads */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FiUpload className="w-5 h-5" />
                        Upload Tugas
                      </CardTitle>
                      <CardDescription>
                        File yang telah diupload mahasiswa
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {meetingDetail.taskUploads.length > 0 ? (
                        <div className="space-y-3">
                          {meetingDetail.taskUploads.map((upload) => (
                            <div
                              key={upload.id}
                              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <FiFileText className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {upload.file_name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Slide {upload.slide_id} - Task{" "}
                                    {upload.task_index + 1}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <p className="text-sm font-medium">
                                    {(upload.file_size / 1024).toFixed(2)} KB
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {upload.file_type}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {formatDate(upload.timestamp)}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedFile(upload);
                                      setFilePreviewOpen(true);
                                    }}
                                  >
                                    <FiEye className="mr-2 h-4 w-4" />
                                    Lihat
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      // file_path is "storage/nim/filename" - remove storage/ prefix
                                      const filePathParts = upload.file_path
                                        .replace(/\\/g, "/")
                                        .replace(/^storage\//, "");
                                      const fileUrl = `https://ictapi.zhaf.my.id/uploads/${filePathParts}`;
                                      window.open(fileUrl, "_blank");
                                    }}
                                  >
                                    <FiDownload className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-8">
                          Belum ada tugas yang diupload
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                // Meeting List View
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>
                            Detail Mahasiswa: {selectedStudent.name}
                          </CardTitle>
                          <CardDescription>
                            NIM: {selectedStudent.nim}
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedStudent(null)}
                        >
                          Kembali
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">
                          Absensi Manual (Kehadiran)
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
                          {Array.from({ length: 20 }, (_, i) => i + 1).map(
                            (meetingNumber) => {
                              const isPresent =
                                selectedStudent.attendances?.some(
                                  (a) =>
                                    a.meeting_id === meetingNumber &&
                                    a.is_present,
                                );

                              return (
                                <button
                                  key={`att-${meetingNumber}`}
                                  onClick={async () => {
                                    try {
                                      const nextState = !isPresent;
                                      // Optimistic local update
                                      const updatedAttendances =
                                        selectedStudent.attendances || [];
                                      const filtered =
                                        updatedAttendances.filter(
                                          (a) => a.meeting_id !== meetingNumber,
                                        );
                                      filtered.push({
                                        meeting_id: meetingNumber,
                                        is_present: nextState,
                                      });
                                      setSelectedStudent({
                                        ...selectedStudent,
                                        attendances: filtered,
                                      });

                                      await teacherAPI.updateAttendance(
                                        selectedStudent.id,
                                        meetingNumber,
                                        nextState,
                                      );
                                      await loadData();
                                    } catch (e) {
                                      toast({
                                        title: "Gagal",
                                        description:
                                          "Gagal memperbarui absensi",
                                        variant: "destructive",
                                      });
                                    }
                                  }}
                                  className={`flex flex-col items-center justify-center p-2 border rounded-md transition-colors ${
                                    isPresent
                                      ? "bg-primary/20 border-primary/50 text-primary hover:bg-primary/30"
                                      : "bg-card hover:bg-muted"
                                  }`}
                                >
                                  <span className="text-xs font-medium">
                                    M {meetingNumber}
                                  </span>
                                  {isPresent ? (
                                    <FiCheckCircle className="mt-1" size={14} />
                                  ) : (
                                    <FiCircle
                                      className="mt-1 text-muted-foreground"
                                      size={14}
                                    />
                                  )}
                                </button>
                              );
                            },
                          )}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mb-3">
                        Riwayat Pertemuan
                      </h3>
                      {studentMeetings.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          Belum ada meeting yang dikerjakan
                        </p>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Meeting</TableHead>
                              <TableHead>Waktu Mulai</TableHead>
                              <TableHead>Durasi</TableHead>
                              <TableHead>Progress</TableHead>
                              <TableHead>Soal</TableHead>
                              <TableHead>Benar</TableHead>
                              <TableHead>Skor</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Aksi</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {studentMeetings.map((meeting) => (
                              <TableRow key={meeting.id}>
                                <TableCell className="font-medium">
                                  Pertemuan {meeting.meeting_id}
                                </TableCell>
                                <TableCell>
                                  {formatDate(meeting.start_time)}
                                </TableCell>
                                <TableCell>
                                  {formatDuration(meeting.duration_minutes)}
                                </TableCell>
                                <TableCell>
                                  Slide {meeting.last_slide_index + 1}
                                </TableCell>
                                <TableCell>
                                  {meeting.is_completed
                                    ? meeting.total_questions
                                    : "-"}
                                </TableCell>
                                <TableCell>
                                  {meeting.is_completed
                                    ? meeting.correct_answers
                                    : "-"}
                                </TableCell>
                                <TableCell>
                                  {meeting.is_completed ? (
                                    <div className="flex items-center gap-1">
                                      <Badge
                                        variant={
                                          meeting.percentage > 100
                                            ? "destructive"
                                            : meeting.percentage >= 70
                                              ? "default"
                                              : "secondary"
                                        }
                                      >
                                        {meeting.percentage.toFixed(1)}%
                                      </Badge>
                                      {meeting.percentage > 100 && (
                                        <span className="text-xs text-destructive">
                                          ⚠️
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground text-sm">
                                      -
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {meeting.is_completed ? (
                                    <Badge variant="default">Selesai</Badge>
                                  ) : (
                                    <Badge variant="outline">
                                      Dalam Progress
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleViewMeeting(meeting)}
                                  >
                                    Lihat Detail
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Daftar Mahasiswa</CardTitle>
                  <CardDescription>
                    Klik pada mahasiswa untuk melihat detail progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center gap-2">
                    <FiSearch className="text-muted-foreground" />
                    <Input
                      placeholder="Cari mahasiswa berdasarkan Nama atau NIM..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>NIM</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Meeting Diikuti</TableHead>
                        <TableHead>Meeting Selesai</TableHead>
                        <TableHead>Rata-rata Quiz</TableHead>
                        <TableHead>Nilai Akhir</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {student.nim}
                          </TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.total_meetings || 0}</TableCell>
                          <TableCell>
                            {student.completed_meetings || 0}
                          </TableCell>
                          <TableCell>
                            {student.avg_score !== undefined ? (
                              <Badge
                                variant={
                                  student.avg_score >= 70
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {student.avg_score.toFixed(1)}%
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {student.final_score !== undefined ? (
                              <Badge
                                variant={
                                  student.final_score >= 70
                                    ? "default"
                                    : "secondary"
                                }
                                title={`M 1-5: ${student.score_breakdown?.score1to5.toFixed(1)}\nM 6-11: ${student.score_breakdown?.score6to11.toFixed(1)}\nM 12-14: ${student.score_breakdown?.score12to14.toFixed(1)}\nM 15-16: ${student.score_breakdown?.score15to16.toFixed(1)}\nM 17-18: ${student.score_breakdown?.score17to18.toFixed(1)}\nM 19: ${student.score_breakdown?.score19.toFixed(1)}\nM 20: ${student.score_breakdown?.score20.toFixed(1)}\nAbsensi: ${student.score_breakdown?.attendanceScore.toFixed(1)}`}
                                className="cursor-help"
                              >
                                {student.final_score.toFixed(1)}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewStudent(student)}
                            >
                              Lihat Detail
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ── ABSENSI TAB ── */}
          <TabsContent value="absensi" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiClipboard className="w-5 h-5" />
                  Absensi Mahasiswa
                </CardTitle>
                <CardDescription>
                  Klik tombol pertemuan untuk toggle kehadiran. Data tersimpan
                  otomatis ke database.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-2">
                  <FiSearch className="text-muted-foreground" />
                  <Input
                    placeholder="Cari mahasiswa berdasarkan Nama atau NIM..."
                    value={absensiSearch}
                    onChange={(e) => setAbsensiSearch(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <div className="overflow-x-auto">
                  <Table className="min-w-max border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="sticky left-0 bg-background z-10 w-[110px] shadow-[1px_0_0_0_hsl(var(--border))]">
                          NIM
                        </TableHead>
                        <TableHead className="sticky left-[110px] bg-background z-10 w-[180px] shadow-[1px_0_0_0_hsl(var(--border))]">
                          Nama
                        </TableHead>
                        <TableHead className="sticky left-[290px] bg-background z-10 w-[70px] text-center shadow-[1px_0_0_0_hsl(var(--border))]">
                          Hadir
                        </TableHead>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(
                          (m) => (
                            <TableHead
                              key={m}
                              className="text-center min-w-[60px] px-1"
                            >
                              M{m}
                            </TableHead>
                          ),
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students
                        .filter(
                          (s) =>
                            s.name
                              .toLowerCase()
                              .includes(absensiSearch.toLowerCase()) ||
                            s.nim
                              .toLowerCase()
                              .includes(absensiSearch.toLowerCase()),
                        )
                        .map((student) => {
                          const totalHadir =
                            student.attendances?.filter((a) => a.is_present)
                              .length ?? 0;
                          return (
                            <TableRow key={student.id}>
                              <TableCell className="sticky left-0 bg-background font-medium shadow-[1px_0_0_0_hsl(var(--border))]">
                                {student.nim}
                              </TableCell>
                              <TableCell className="sticky left-[110px] bg-background shadow-[1px_0_0_0_hsl(var(--border))]">
                                {student.name}
                              </TableCell>
                              <TableCell className="sticky left-[290px] bg-background text-center shadow-[1px_0_0_0_hsl(var(--border))]">
                                <Badge
                                  variant={
                                    totalHadir >= 14
                                      ? "default"
                                      : totalHadir >= 10
                                        ? "secondary"
                                        : "destructive"
                                  }
                                >
                                  {totalHadir}/20
                                </Badge>
                              </TableCell>
                              {Array.from({ length: 20 }, (_, i) => i + 1).map(
                                (meetingNum) => {
                                  const isPresent =
                                    student.attendances?.some(
                                      (a) =>
                                        a.meeting_id === meetingNum &&
                                        a.is_present,
                                    ) ?? false;
                                  const key = `${student.id}-${meetingNum}`;
                                  const isSaving = savingAttendance.has(key);
                                  return (
                                    <TableCell
                                      key={meetingNum}
                                      className="text-center px-1"
                                    >
                                      <button
                                        disabled={isSaving}
                                        onClick={async () => {
                                          const nextState = !isPresent;
                                          setSavingAttendance((prev) =>
                                            new Set(prev).add(key),
                                          );
                                          // Optimistic update
                                          setStudents((prev) =>
                                            prev.map((s) => {
                                              if (s.id !== student.id) return s;
                                              const filtered = (
                                                s.attendances || []
                                              ).filter(
                                                (a) =>
                                                  a.meeting_id !== meetingNum,
                                              );
                                              filtered.push({
                                                meeting_id: meetingNum,
                                                is_present: nextState,
                                              });
                                              return {
                                                ...s,
                                                attendances: filtered,
                                              };
                                            }),
                                          );
                                          try {
                                            await teacherAPI.updateAttendance(
                                              student.id,
                                              meetingNum,
                                              nextState,
                                            );
                                          } catch {
                                            // Revert on failure
                                            setStudents((prev) =>
                                              prev.map((s) => {
                                                if (s.id !== student.id)
                                                  return s;
                                                const filtered = (
                                                  s.attendances || []
                                                ).filter(
                                                  (a) =>
                                                    a.meeting_id !== meetingNum,
                                                );
                                                filtered.push({
                                                  meeting_id: meetingNum,
                                                  is_present: isPresent,
                                                });
                                                return {
                                                  ...s,
                                                  attendances: filtered,
                                                };
                                              }),
                                            );
                                            toast({
                                              title: "Gagal",
                                              description:
                                                "Gagal memperbarui absensi",
                                              variant: "destructive",
                                            });
                                          } finally {
                                            setSavingAttendance((prev) => {
                                              const next = new Set(prev);
                                              next.delete(key);
                                              return next;
                                            });
                                          }
                                        }}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all text-xs font-bold border ${
                                          isSaving
                                            ? "opacity-50 cursor-not-allowed bg-muted border-muted-foreground/30"
                                            : isPresent
                                              ? "bg-green-500 border-green-600 text-white hover:bg-green-600 shadow-sm"
                                              : "bg-background border-muted-foreground/30 text-muted-foreground hover:border-primary/50 hover:text-primary"
                                        }`}
                                        title={
                                          isPresent
                                            ? `Hadir M${meetingNum} — klik untuk absen`
                                            : `Tidak hadir M${meetingNum} — klik untuk tandai hadir`
                                        }
                                      >
                                        {isSaving ? (
                                          <span className="animate-spin inline-block w-3 h-3 border border-current border-t-transparent rounded-full" />
                                        ) : isPresent ? (
                                          <FiCheckCircle size={14} />
                                        ) : (
                                          <FiCircle size={14} />
                                        )}
                                      </button>
                                    </TableCell>
                                  );
                                },
                              )}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Progress Meeting Mahasiswa</CardTitle>
                <CardDescription>
                  Nilai per pertemuan dari tiap mahasiswa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-2">
                  <FiSearch className="text-muted-foreground" />
                  <Input
                    placeholder="Cari mahasiswa berdasarkan Nama atau NIM..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <div className="overflow-x-auto">
                  <Table className="min-w-max relative border-collapse">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="sticky left-0 bg-background z-10 w-[120px] shadow-[1px_0_0_0_hsl(var(--border))]">
                          NIM
                        </TableHead>
                        <TableHead className="sticky left-[120px] bg-background z-10 w-[200px] shadow-[1px_0_0_0_hsl(var(--border))]">
                          Nama
                        </TableHead>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(
                          (m) => (
                            <TableHead
                              key={m}
                              className="text-center min-w-[80px]"
                            >
                              M {m}
                            </TableHead>
                          ),
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="sticky left-0 bg-background font-medium shadow-[1px_0_0_0_hsl(var(--border))]">
                            {student.nim}
                          </TableCell>
                          <TableCell className="sticky left-[120px] bg-background shadow-[1px_0_0_0_hsl(var(--border))]">
                            {student.name}
                          </TableCell>
                          {Array.from({ length: 20 }, (_, i) => i + 1).map(
                            (m) => {
                              const prog = student.meeting_progress?.find(
                                (p) => p.meeting_id === m,
                              );
                              return (
                                <TableCell key={m} className="text-center">
                                  {prog && prog.is_completed ? (
                                    <Badge
                                      variant={
                                        prog.percentage >= 70
                                          ? "default"
                                          : "secondary"
                                      }
                                    >
                                      {Math.round(prog.percentage)}%
                                    </Badge>
                                  ) : (
                                    <span className="text-muted-foreground">
                                      -
                                    </span>
                                  )}
                                </TableCell>
                              );
                            },
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terkini</CardTitle>
                <CardDescription>
                  10 aktivitas terbaru dari mahasiswa
                </CardDescription>
              </CardHeader>
              <CardContent>
                {statistics?.recentActivity &&
                statistics.recentActivity.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mahasiswa</TableHead>
                        <TableHead>NIM</TableHead>
                        <TableHead>Meeting</TableHead>
                        <TableHead>Skor</TableHead>
                        <TableHead>Waktu</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {statistics.recentActivity.map((activity, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {activity.name}
                          </TableCell>
                          <TableCell>{activity.nim}</TableCell>
                          <TableCell>Pertemuan {activity.meeting_id}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                activity.percentage >= 70
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {activity.percentage.toFixed(1)}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {formatDate(activity.updated_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Belum ada aktivitas
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FiSettings className="w-5 h-5" />
                      Manajemen User
                    </CardTitle>
                    <CardDescription>
                      Kelola status aktif/nonaktif pengguna
                    </CardDescription>
                  </div>
                  <Button
                    onClick={loadUsers}
                    disabled={loadingUsers}
                    variant="outline"
                  >
                    <FiRefreshCw
                      className={`mr-2 ${loadingUsers ? "animate-spin" : ""}`}
                    />
                    {loadingUsers ? "Memuat..." : "Refresh"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-2">
                  <FiSearch className="text-muted-foreground" />
                  <Input
                    placeholder="Cari berdasarkan Nama atau NIM..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="max-w-sm"
                  />
                </div>

                {loadingUsers ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Memuat data pengguna...
                    </p>
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Klik tombol Refresh untuk memuat data pengguna
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>NIM</TableHead>
                          <TableHead>Nama</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Terdaftar</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users
                          .filter(
                            (user) =>
                              user.name
                                .toLowerCase()
                                .includes(userSearch.toLowerCase()) ||
                              user.nim
                                .toLowerCase()
                                .includes(userSearch.toLowerCase()),
                          )
                          .map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">
                                {user.nim}
                              </TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    user.role === "teacher"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {user.role === "teacher" ? "Guru" : "Siswa"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {user.is_active === 1 ? (
                                  <Badge variant="default" className="gap-1">
                                    <FiUserCheck className="w-3 h-3" />
                                    Aktif
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="destructive"
                                    className="gap-1"
                                  >
                                    <FiUserX className="w-3 h-3" />
                                    Nonaktif
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {new Date(user.created_at).toLocaleDateString(
                                  "id-ID",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  },
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  onClick={() =>
                                    toggleUserActive(user.id, user.is_active)
                                  }
                                  disabled={togglingUserId === user.id}
                                  variant={
                                    user.is_active === 1
                                      ? "destructive"
                                      : "default"
                                  }
                                  size="sm"
                                >
                                  {togglingUserId === user.id ? (
                                    <>
                                      <FiRefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                      Loading...
                                    </>
                                  ) : user.is_active === 1 ? (
                                    <>
                                      <FiUserX className="mr-2 h-4 w-4" />
                                      Nonaktifkan
                                    </>
                                  ) : (
                                    <>
                                      <FiUserCheck className="mr-2 h-4 w-4" />
                                      Aktifkan
                                    </>
                                  )}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>

                    {users.filter(
                      (user) =>
                        user.name
                          .toLowerCase()
                          .includes(userSearch.toLowerCase()) ||
                        user.nim
                          .toLowerCase()
                          .includes(userSearch.toLowerCase()),
                    ).length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          Tidak ada pengguna yang cocok dengan pencarian
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* File Preview Modal */}
      <Dialog open={filePreviewOpen} onOpenChange={setFilePreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FiFileText className="w-5 h-5" />
              {selectedFile?.file_name}
            </DialogTitle>
            <DialogDescription>
              {selectedFile && (
                <div className="flex items-center gap-4 mt-2">
                  <span>
                    Slide {selectedFile.slide_id} - Task{" "}
                    {selectedFile.task_index + 1}
                  </span>
                  <span>•</span>
                  <span>{(selectedFile.file_size / 1024).toFixed(2)} KB</span>
                  <span>•</span>
                  <span>{selectedFile.file_type}</span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedFile && selectedStudent && (
              <div className="flex flex-col items-center justify-center">
                {(() => {
                  // file_path is "storage/nim/filename" - remove storage/ prefix
                  const filePathParts = selectedFile.file_path
                    .replace(/\\/g, "/")
                    .replace(/^storage\//, "");
                  const fileUrl = `https://ictapi.zhaf.my.id/uploads/${filePathParts}`;

                  if (selectedFile.file_type.startsWith("image/")) {
                    return (
                      <img
                        src={fileUrl}
                        alt={selectedFile.file_name}
                        className="max-w-full h-auto rounded-lg border"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.parentElement!.innerHTML =
                            '<div class="text-center p-8 text-muted-foreground">Tidak dapat memuat gambar</div>';
                        }}
                      />
                    );
                  } else if (selectedFile.file_type === "application/pdf") {
                    return (
                      <iframe
                        src={fileUrl}
                        className="w-full h-[600px] rounded-lg border"
                        title={selectedFile.file_name}
                      />
                    );
                  } else {
                    return null;
                  }
                })()}
                {!selectedFile.file_type.startsWith("image/") &&
                  selectedFile.file_type !== "application/pdf" && (
                    <div className="text-center p-8 space-y-4">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <FiFileText className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-lg mb-2">
                          {selectedFile.file_name}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Pratinjau tidak tersedia untuk tipe file ini
                        </p>
                        <Button
                          onClick={() => {
                            // file_path is "storage/nim/filename" - remove storage/ prefix
                            const filePathParts = selectedFile.file_path
                              .replace(/\\/g, "/")
                              .replace(/^storage\//, "");
                            const fileUrl = `https://ictapi.zhaf.my.id/uploads/${filePathParts}`;
                            window.open(fileUrl, "_blank");
                          }}
                        >
                          <FiDownload className="mr-2 h-4 w-4" />
                          Download File
                        </Button>
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;
