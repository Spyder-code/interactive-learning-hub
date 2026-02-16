const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Helper function untuk mengambil auth token
function getAuthToken() {
  return localStorage.getItem("auth_token");
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
  async getAllMeetings() {
    const response = await fetch(`${API_BASE_URL}/meetings`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data meeting");
    }

    return response.json();
  },

  async getMeeting(meetingId: string) {
    const response = await fetch(`${API_BASE_URL}/meetings/${meetingId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data meeting");
    }

    return response.json();
  },

  async saveQuizAnswer(
    meetingId: string,
    slideId: number,
    questionIndex: number,
    selectedOption: string,
    isCorrect: boolean,
    questionType: string = "multiple-choice",
  ) {
    const response = await fetch(`${API_BASE_URL}/meetings/${meetingId}/quiz`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        slideId,
        questionIndex,
        selectedOption,
        isCorrect,
        questionType,
      }),
    });

    if (!response.ok) {
      throw new Error("Gagal menyimpan jawaban");
    }

    return response.json();
  },

  async saveTaskUpload(
    meetingId: string,
    slideId: number,
    taskIndex: number,
    fileName: string,
    fileSize: number,
    fileType: string,
  ) {
    const response = await fetch(`${API_BASE_URL}/meetings/${meetingId}/task`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        slideId,
        taskIndex,
        fileName,
        fileSize,
        fileType,
      }),
    });

    if (!response.ok) {
      throw new Error("Gagal menyimpan task");
    }

    return response.json();
  },

  async updateProgress(
    meetingId: string,
    slideIndex: number,
    maxSlideReached: number,
  ) {
    const response = await fetch(
      `${API_BASE_URL}/meetings/${meetingId}/progress`,
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
    meetingId: string,
    totalQuestions: number,
    correctAnswers: number,
    percentage: number,
  ) {
    const response = await fetch(
      `${API_BASE_URL}/meetings/${meetingId}/complete`,
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
