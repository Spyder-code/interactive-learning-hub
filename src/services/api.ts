const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://ictapi.zhaf.my.id/api";

// Helper function untuk mengambil auth token
function getAuthToken() {
  return localStorage.getItem("token") || localStorage.getItem("auth_token");
}

// Helper function untuk mengambil auth headers
function getAuthHeaders() {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export function getUploadUrl(filePath?: string | null) {
  if (!filePath) return "";
  if (/^https?:\/\//i.test(filePath)) return filePath;

  const normalizedPath = filePath.replace(/\\/g, "/").replace(/^storage\//, "");
  return `${API_BASE_URL.replace("/api", "")}/uploads/${normalizedPath}`;
}

// Auth API
export const authAPI = {
  async login(nim: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nim, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login gagal");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  },

  async register(nim: string, password: string, name: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nim, password, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registrasi gagal");
    }

    return response.json();
  },

  async verify() {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Token tidak valid");
    }

    return response.json();
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!getAuthToken();
  },
};

// Meeting API
export const meetingAPI = {
  async getMeetingDefinitions() {
    const response = await fetch(`${API_BASE_URL}/meeting-definitions`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil daftar pertemuan");
    }

    return response.json();
  },

  async getAllMeetings() {
    const response = await fetch(`${API_BASE_URL}/meetings`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data meeting");
    }

    return response.json();
  },

  async getAllMeetingsStatus() {
    const response = await fetch(`${API_BASE_URL}/meetings/all-status`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil status meeting");
    }

    return response.json();
  },

  async getMeeting(meetingNumber: number) {
    const response = await fetch(`${API_BASE_URL}/meetings/${meetingNumber}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data meeting");
    }

    return response.json();
  },

  async getMyAttendances() {
    const response = await fetch(`${API_BASE_URL}/attendances/me`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil status absensi");
    }

    return response.json();
  },

  async uploadAttendance(meetingNumber: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const token = getAuthToken();
    const response = await fetch(
      `${API_BASE_URL}/meetings/${meetingNumber}/attendance`,
      {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      },
    );

    if (!response.ok) {
      let errorMessage = "Gagal menyimpan absensi";
      try {
        const error = await response.json();
        errorMessage = error.error || errorMessage;
      } catch (e) {
        // Keep fallback message.
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async saveQuizAnswer(
    meetingNumber: number,
    slideId: number,
    questionIndex: number,
    selectedOption: string,
    isCorrect: boolean,
    questionType: string = "multiple-choice",
  ) {
    const response = await fetch(
      `${API_BASE_URL}/meetings/${meetingNumber}/quiz`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          slideId,
          questionIndex,
          selectedOption,
          isCorrect,
          questionType,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal menyimpan jawaban");
    }

    return response.json();
  },

  async saveTaskUpload(
    meetingNumber: number,
    slideId: number,
    taskIndex: number,
    file: File,
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slideId", slideId.toString());
    formData.append("taskIndex", taskIndex.toString());

    const token = getAuthToken();
    const response = await fetch(
      `${API_BASE_URL}/meetings/${meetingNumber}/task`,
      {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          // Don't set Content-Type header - browser will set it with boundary
        },
        body: formData,
      },
    );

    if (!response.ok) {
      let errorMessage = "Gagal menyimpan task";
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const error = await response.json();
          errorMessage = error.error || errorMessage;
        } else {
          errorMessage = await response.text();
        }
      } catch (e) {
        // Fallback if parsing fails
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async removeTaskUpload(
    meetingNumber: number,
    slideId: number,
    taskIndex: number,
  ) {
    const response = await fetch(
      `${API_BASE_URL}/meetings/${meetingNumber}/task`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          slideId,
          taskIndex,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal menghapus task");
    }

    return response.json();
  },

  async updateProgress(
    meetingNumber: number,
    slideIndex: number,
    maxSlideReached: number,
  ) {
    const response = await fetch(
      `${API_BASE_URL}/meetings/${meetingNumber}/progress`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          slideIndex,
          maxSlideReached,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal menyimpan progress");
    }

    return response.json();
  },

  async completeMeeting(
    meetingNumber: number,
    totalQuestions: number,
    correctAnswers: number,
    percentage: number,
  ) {
    const response = await fetch(
      `${API_BASE_URL}/meetings/${meetingNumber}/complete`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          totalQuestions,
          correctAnswers,
          percentage,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal menyelesaikan meeting");
    }

    return response.json();
  },
};

// Teacher API
export const teacherAPI = {
  async getStudents() {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/students/summary`,
      {
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data mahasiswa");
    }

    return response.json();
  },

  async importStudents(students: Array<{ nim: string; name: string }>) {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/students/import`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ students }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Gagal import mahasiswa");
    }

    return response.json();
  },

  async deleteAllStudents() {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/students`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Gagal menghapus semua mahasiswa");
    }

    return response.json();
  },

  async getStatistics() {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/statistics`,
      {
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil statistik");
    }

    return response.json();
  },

  async getStudentMeetings(studentId: number) {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/students/${studentId}/meetings`,
      {
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data meeting mahasiswa");
    }

    return response.json();
  },

  async getStudentMeetingDetail(studentId: number, meetingNumber: number) {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/students/${studentId}/meetings/${meetingNumber}`,
      {
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil detail meeting");
    }

    return response.json();
  },

  async getMeetingReports(meetingNumber?: number) {
    const url = meetingNumber
      ? `${API_BASE_URL.replace("/api", "")}/api/teacher/reports/meetings?meetingNumber=${meetingNumber}`
      : `${API_BASE_URL.replace("/api", "")}/api/teacher/reports/meetings`;

    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil laporan meeting");
    }

    return response.json();
  },

  async getMeetingDefinitions() {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/meeting-definitions`,
      {
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil daftar meeting");
    }

    return response.json();
  },

  async updateMeetingDefinition(
    meetingNumber: number,
    data: {
      title: string;
      subtitle: string;
      duration: number;
      openedAt?: string | null;
      closedAt?: string | null;
      attendanceOpenedAt?: string | null;
      attendanceClosedAt?: string | null;
      isActive: boolean;
    },
  ) {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/meeting-definitions/${meetingNumber}`,
      {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Gagal menyimpan meeting");
    }

    return response.json();
  },

  async recalculateScore(meetingId: number, totalQuestionsActual: number) {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/meetings/${meetingId}/recalculate`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ totalQuestionsActual }),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal recalculate score");
    }

    return response.json();
  },

  async downloadDatabase() {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/database/download`,
      {
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal mengunduh database");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "database.json";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  async updateAttendance(
    studentId: number,
    meetingId: number,
    isPresent: boolean,
  ) {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/students/${studentId}/attendance/${meetingId}`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ is_present: isPresent }),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal mengupdate absensi");
    }

    return response.json();
  },

  async getAllUsers() {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/users`,
      {
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data pengguna");
    }

    return response.json();
  },

  async toggleUserActive(userId: number, isActive: boolean) {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/users/${userId}/active`,
      {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ is_active: isActive }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Gagal mengubah status user");
    }

    return response.json();
  },

  async logoutAllAccounts() {
    const response = await fetch(
      `${API_BASE_URL.replace("/api", "")}/api/teacher/logout-all`,
      {
        method: "POST",
        headers: getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Gagal mengakhiri semua sesi");
    }

    return response.json();
  },
};
