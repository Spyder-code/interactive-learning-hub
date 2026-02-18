import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/services/api";
import { meetings, getMeetingId } from "@/data/meetings";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "react-icons/fi";

interface Student {
  id: number;
  nim: string;
  name: string;
  created_at: string;
  total_meetings?: number;
  completed_meetings?: number;
  avg_score?: number;
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
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentMeetings, setStudentMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [meetingDetail, setMeetingDetail] = useState<MeetingDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [selectedFile, setSelectedFile] = useState<TaskUpload | null>(null);
  const [filePreviewOpen, setFilePreviewOpen] = useState(false);
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
      const token = localStorage.getItem("token");

      // Load students summary
      const studentsRes = await fetch(
        "http://localhost:3001/api/teacher/students/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!studentsRes.ok) throw new Error("Failed to fetch students");
      const studentsData = await studentsRes.json();
      setStudents(studentsData);

      // Load statistics
      const statsRes = await fetch(
        "http://localhost:3001/api/teacher/statistics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!statsRes.ok) throw new Error("Failed to fetch statistics");
      const statsData = await statsRes.json();
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
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3001/api/teacher/students/${studentId}/meetings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Failed to fetch meetings");
      const data = await res.json();
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
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3001/api/teacher/students/${studentId}/meetings/${meetingNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Failed to fetch meeting detail");
      const data = await res.json();

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
            <Button variant="outline" onClick={handleLogout}>
              <FiLogOut className="mr-2" />
              Logout
            </Button>
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
            <TabsTrigger value="activity">
              <FiActivity className="mr-2" />
              Aktivitas Terkini
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
                        <Button
                          variant="outline"
                          onClick={handleBackToMeetings}
                        >
                          <FiArrowLeft className="mr-2" />
                          Kembali ke Daftar Meeting
                        </Button>
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
                            <Badge
                              variant={
                                selectedMeeting.percentage >= 70
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {selectedMeeting.percentage.toFixed(1)}%
                            </Badge>
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
                            {selectedMeeting.correct_answers} /{" "}
                            {selectedMeeting.total_questions}
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
                                      const fileUrl = `http://localhost:3001/uploads/${filePathParts}`;
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
                              <TableCell>{meeting.total_questions}</TableCell>
                              <TableCell>{meeting.correct_answers}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    meeting.percentage >= 70
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {meeting.percentage.toFixed(1)}%
                                </Badge>
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>NIM</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Meeting Diikuti</TableHead>
                        <TableHead>Meeting Selesai</TableHead>
                        <TableHead>Rata-rata Skor</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
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
                            {student.avg_score ? (
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
                  const fileUrl = `http://localhost:3001/uploads/${filePathParts}`;

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
                            const fileUrl = `http://localhost:3001/uploads/${filePathParts}`;
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
