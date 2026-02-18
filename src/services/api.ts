const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

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
    // Clear quiz storage sebelum login untuk menghapus data user sebelumnya
    localStorage.removeItem("quiz-storage");
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
    // Clear quiz storage untuk menghapus data mahasiswa sebelumnya
    localStorage.removeItem("quiz-storage");
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

    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/meetings/${meetingNumber}/task`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type header - browser will set it with boundary
        },
        body: formData,
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Gagal menyimpan task");
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
};
