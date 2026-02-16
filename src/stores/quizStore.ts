import { create } from "zustand";
import { persist } from "zustand/middleware";

// Interface untuk jawaban quiz
interface QuizAnswer {
  slideId: number;
  questionIndex: number;
  selectedOption: string; // For multiple-choice: option label (a, b, c), for free-text: the user's answer
  isCorrect: boolean;
  timestamp: number;
  questionType?: "multiple-choice" | "free-text"; // Track question type
}

// Interface untuk file upload
interface TaskUpload {
  slideId: number;
  taskIndex: number;
  fileName: string;
  fileSize: number;
  fileType: string;
  timestamp: number;
}

// Interface untuk menyimpan history hasil belajar per pertemuan
interface MeetingHistory {
  meetingId: string;
  completedAt: number;
  startDateTime: number; // Waktu mulai mengerjakan meeting
  endDateTime: number; // Waktu selesai mengerjakan meeting
  durationMinutes: number; // Durasi dalam menit
  answers: Record<string, QuizAnswer>;
  uploads: Record<string, TaskUpload>;
  lastSlideIndex: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
}

interface QuizState {
  // Map dari "slideId-questionIndex" ke QuizAnswer
  answers: Record<string, QuizAnswer>;
  // Map dari "slideId-taskIndex" ke TaskUpload
  uploads: Record<string, TaskUpload>;
  // Map dari "meetingId" ke max slide index yang sudah dicapai
  maxSlideReached: Record<string, number>;
  // Map dari "meetingId" ke history hasil belajar
  meetingHistory: Record<string, MeetingHistory>;
  // Map dari "meetingId" ke waktu mulai mengerjakan (untuk meeting yang sedang berjalan)
  meetingStartTimes: Record<string, number>;
  // Simpan jawaban quiz
  saveAnswer: (
    slideId: number,
    questionIndex: number,
    selectedOption: string,
    isCorrect: boolean,
    questionType?: "multiple-choice" | "free-text",
  ) => void;
  // Ambil jawaban untuk pertanyaan tertentu
  getAnswer: (slideId: number, questionIndex: number) => QuizAnswer | undefined;
  // Cek apakah pertanyaan sudah dijawab
  isAnswered: (slideId: number, questionIndex: number) => boolean;
  // Reset semua jawaban
  resetAnswers: () => void;
  // Ambil semua hasil quiz untuk summary
  getQuizResults: () => Record<string, boolean>;
  // Simpan file upload info
  saveUpload: (
    slideId: number,
    taskIndex: number,
    fileName: string,
    fileSize: number,
    fileType: string,
  ) => void;
  // Ambil upload untuk task tertentu
  getUpload: (slideId: number, taskIndex: number) => TaskUpload | undefined;
  // Cek apakah semua tasks di slide sudah diupload
  isTasksCompleted: (slideId: number, totalTasks: number) => boolean;
  // Remove upload
  removeUpload: (slideId: number, taskIndex: number) => void;
  // Cek apakah semua quiz di slide sudah dijawab
  isQuizCompleted: (slideId: number, totalQuestions: number) => boolean;
  // Update max slide yang sudah dicapai untuk meeting tertentu
  updateMaxSlideReached: (meetingId: string, slideIndex: number) => void;
  // Cek apakah slide bisa diakses (sudah pernah dicapai)
  canAccessSlide: (meetingId: string, slideIndex: number) => boolean;
  // Get max slide reached untuk meeting tertentu
  getMaxSlideReached: (meetingId: string) => number;
  // Simpan history hasil belajar untuk meeting tertentu
  saveMeetingHistory: (
    meetingId: string,
    lastSlideIndex: number,
    totalQuestions: number,
    correctAnswers: number,
  ) => void;
  // Ambil history hasil belajar untuk meeting tertentu
  getMeetingHistory: (meetingId: string) => MeetingHistory | undefined;
  // Cek apakah meeting sudah pernah diselesaikan
  isMeetingCompleted: (meetingId: string) => boolean;
  // Load history untuk meeting tertentu (restore answers & uploads)
  loadMeetingHistory: (meetingId: string) => void;
  // Clear data meeting saat ini (untuk memulai ulang)
  clearCurrentMeeting: (meetingId: string) => void;
  // Set waktu mulai mengerjakan meeting
  setMeetingStartTime: (meetingId: string, timestamp?: number) => void;
  // Get waktu mulai mengerjakan meeting
  getMeetingStartTime: (meetingId: string) => number | undefined;
  // Clear all data (untuk logout)
  clearAll: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      answers: {},
      uploads: {},
      maxSlideReached: {},
      meetingHistory: {},
      meetingStartTimes: {},

      saveAnswer: (
        slideId,
        questionIndex,
        selectedOption,
        isCorrect,
        questionType,
      ) => {
        const key = `${slideId}-${questionIndex}`;
        const answer: QuizAnswer = {
          slideId,
          questionIndex,
          selectedOption,
          isCorrect,
          timestamp: Date.now(),
          questionType: questionType || "multiple-choice",
        };

        set((state) => ({
          answers: {
            ...state.answers,
            [key]: answer,
          },
        }));
      },

      getAnswer: (slideId, questionIndex) => {
        const key = `${slideId}-${questionIndex}`;
        return get().answers[key];
      },

      isAnswered: (slideId, questionIndex) => {
        const key = `${slideId}-${questionIndex}`;
        return key in get().answers;
      },

      resetAnswers: () => {
        set({ answers: {}, uploads: {} });
      },

      getQuizResults: () => {
        const answers = get().answers;
        const results: Record<string, boolean> = {};
        Object.keys(answers).forEach((key) => {
          results[key] = answers[key].isCorrect;
        });
        return results;
      },

      saveUpload: (slideId, taskIndex, fileName, fileSize, fileType) => {
        const key = `${slideId}-${taskIndex}`;
        const upload: TaskUpload = {
          slideId,
          taskIndex,
          fileName,
          fileSize,
          fileType,
          timestamp: Date.now(),
        };

        set((state) => ({
          uploads: {
            ...state.uploads,
            [key]: upload,
          },
        }));
      },

      getUpload: (slideId, taskIndex) => {
        const key = `${slideId}-${taskIndex}`;
        return get().uploads[key];
      },

      isTasksCompleted: (slideId, totalTasks) => {
        if (totalTasks === 0) return true;

        const uploads = get().uploads;
        for (let i = 0; i < totalTasks; i++) {
          const key = `${slideId}-${i}`;
          if (!(key in uploads)) {
            return false;
          }
        }
        return true;
      },

      removeUpload: (slideId, taskIndex) => {
        const key = `${slideId}-${taskIndex}`;
        set((state) => {
          const newUploads = { ...state.uploads };
          delete newUploads[key];
          return { uploads: newUploads };
        });
      },

      isQuizCompleted: (slideId, totalQuestions) => {
        if (totalQuestions === 0) return true;

        const answers = get().answers;
        for (let i = 0; i < totalQuestions; i++) {
          const key = `${slideId}-${i}`;
          if (!(key in answers)) {
            return false;
          }
        }
        return true;
      },

      updateMaxSlideReached: (meetingId, slideIndex) => {
        set((state) => {
          const currentMax = state.maxSlideReached[meetingId] ?? 0;
          if (slideIndex > currentMax) {
            return {
              maxSlideReached: {
                ...state.maxSlideReached,
                [meetingId]: slideIndex,
              },
            };
          }
          return state;
        });
      },

      canAccessSlide: (meetingId, slideIndex) => {
        const maxReached = get().maxSlideReached[meetingId] ?? 0;
        return slideIndex <= maxReached;
      },

      getMaxSlideReached: (meetingId) => {
        return get().maxSlideReached[meetingId] ?? 0;
      },

      saveMeetingHistory: (
        meetingId,
        lastSlideIndex,
        totalQuestions,
        correctAnswers,
      ) => {
        const percentage =
          totalQuestions > 0
            ? Math.round((correctAnswers / totalQuestions) * 100)
            : 0;

        const endDateTime = Date.now();
        const startDateTime = get().meetingStartTimes[meetingId] || endDateTime;
        const durationMinutes = Math.round(
          (endDateTime - startDateTime) / 60000,
        ); // Convert ms to minutes

        const history: MeetingHistory = {
          meetingId,
          completedAt: endDateTime,
          startDateTime,
          endDateTime,
          durationMinutes,
          answers: { ...get().answers },
          uploads: { ...get().uploads },
          lastSlideIndex,
          totalQuestions,
          correctAnswers,
          percentage,
        };

        set((state) => ({
          meetingHistory: {
            ...state.meetingHistory,
            [meetingId]: history,
          },
          // Clear start time after saving
          meetingStartTimes: {
            ...state.meetingStartTimes,
            [meetingId]: undefined,
          },
        }));
      },

      getMeetingHistory: (meetingId) => {
        return get().meetingHistory[meetingId];
      },

      isMeetingCompleted: (meetingId) => {
        return meetingId in get().meetingHistory;
      },

      loadMeetingHistory: (meetingId) => {
        const history = get().meetingHistory[meetingId];
        if (history) {
          set({
            answers: { ...history.answers },
            uploads: { ...history.uploads },
            maxSlideReached: {
              ...get().maxSlideReached,
              [meetingId]: history.lastSlideIndex,
            },
          });
        }
      },

      clearCurrentMeeting: (meetingId) => {
        // Clear answers dan uploads untuk meeting ini
        const answers = get().answers;
        const uploads = get().uploads;

        // Filter out entries that don't belong to this meeting
        // Note: We need to pass slides to filter correctly
        // For now, we'll clear all answers and uploads
        set({
          answers: {},
          uploads: {},
          maxSlideReached: {
            ...get().maxSlideReached,
            [meetingId]: 0,
          },
        });
      },

      // Implementation
      setMeetingStartTime: (meetingId, timestamp) => {
        if (!get().meetingStartTimes[meetingId]) {
          set((state) => ({
            meetingStartTimes: {
              ...state.meetingStartTimes,
              [meetingId]: timestamp || Date.now(), // Use provided timestamp or fallback
            },
          }));
        }
      },

      getMeetingStartTime: (meetingId) => {
        return get().meetingStartTimes[meetingId];
      },

      clearAll: () => {
        set({
          answers: {},
          uploads: {},
          maxSlideReached: {},
          meetingHistory: {},
          meetingStartTimes: {},
        });
      },
    }),
    {
      name: "quiz-storage", // nama key di localStorage
      version: 6, // Increment version for timer fields (startDateTime, endDateTime, durationMinutes)
    },
  ),
);
