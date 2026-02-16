import { useQuizStore } from "@/stores/quizStore";
import { meetingAPI } from "@/services/api";
import { useEffect, useState, useRef } from "react";

// Hook untuk mengintegrasikan zustand store dengan backend API
export const useQuizStoreWithAPI = (meetingId: string) => {
  const store = useQuizStore();
  const [isLoading, setIsLoading] = useState(true);
  const loadedMeetingRef = useRef<string | null>(null);

  // Load data from backend when component mounts or meetingId changes
  useEffect(() => {
    if (!meetingId) return;

    // Skip if already loaded for this meetingId
    if (loadedMeetingRef.current === meetingId) {
      setIsLoading(false);
      return;
    }

    const loadMeetingData = async () => {
      setIsLoading(true);

      try {
        const data = await meetingAPI.getMeeting(meetingId);

        // Note: Tidak perlu clear store karena:
        // 1. Data dari backend akan overwrite data yang ada
        // 2. localStorage sudah di-clear saat login/logout untuk prevent data tercampur antar user

        // Load quiz answers from backend
        if (data.quizAnswers && data.quizAnswers.length > 0) {
          data.quizAnswers.forEach((answer: any) => {
            store.saveAnswer(
              answer.slide_id,
              answer.question_index,
              answer.selected_option,
              answer.is_correct === 1,
              answer.question_type,
            );
          });
        }

        // Load task uploads from backend
        if (data.taskUploads && data.taskUploads.length > 0) {
          data.taskUploads.forEach((upload: any) => {
            store.saveUpload(
              upload.slide_id,
              upload.task_index,
              upload.file_name,
              upload.file_size,
              upload.file_type,
            );
          });
        }

        // Load slide progress from backend
        if (data.slideProgress) {
          store.updateMaxSlideReached(
            meetingId,
            data.slideProgress.max_slide_reached,
          );
        }

        // Load meeting history if completed
        if (data.meeting && data.meeting.is_completed) {
          // Store the meeting history in the store
          store.saveMeetingHistory(
            meetingId,
            data.meeting.last_slide_index,
            data.meeting.total_questions,
            data.meeting.correct_answers,
          );
        }

        // Load start time from backend (parse as Asia/Jakarta local time)
        // Server returns start_time in 'YYYY-MM-DD HH:MM:SS' in Asia/Jakarta.
        if (
          data.meeting &&
          data.meeting.start_time &&
          !data.meeting.is_completed
        ) {
          const raw = String(data.meeting.start_time);
          const m = raw.match(
            /(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/,
          );
          if (m) {
            const year = Number(m[1]);
            const month = Number(m[2]);
            const day = Number(m[3]);
            const hour = Number(m[4]);
            const minute = Number(m[5]);
            const second = Number(m[6]);
            // Convert Jakarta local time to UTC timestamp by subtracting 7 hours
            const utcTimestamp =
              Date.UTC(year, month - 1, day, hour, minute, second) -
              7 * 3600 * 1000;
            store.setMeetingStartTime(meetingId, utcTimestamp);
          } else {
            // Fallback: try Date parsing
            const ts = Date.parse(raw);
            if (!Number.isNaN(ts)) store.setMeetingStartTime(meetingId, ts);
          }
        }

        // Mark as loaded
        loadedMeetingRef.current = meetingId;
      } catch (error) {
        console.error("Failed to load meeting data from backend:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMeetingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingId]); // Only depend on meetingId, store is stable from Zustand

  // Wrap saveAnswer to also save to backend
  const saveAnswerWithAPI = async (
    slideId: number,
    questionIndex: number,
    selectedOption: string,
    isCorrect: boolean,
    questionType?: "multiple-choice" | "free-text",
  ) => {
    // Save to local store first
    store.saveAnswer(
      slideId,
      questionIndex,
      selectedOption,
      isCorrect,
      questionType,
    );

    // Then save to backend
    try {
      await meetingAPI.saveQuizAnswer(
        meetingId,
        slideId,
        questionIndex,
        selectedOption,
        isCorrect,
        questionType || "multiple-choice",
      );
    } catch (error) {
      console.error("Failed to save answer to backend:", error);
    }
  };

  // Wrap saveUpload to also save to backend
  const saveUploadWithAPI = async (
    slideId: number,
    taskIndex: number,
    file: File,
  ) => {
    // Save metadata to local store first
    store.saveUpload(slideId, taskIndex, file.name, file.size, file.type);

    // Then save actual file to backend
    try {
      await meetingAPI.saveTaskUpload(meetingId, slideId, taskIndex, file);
    } catch (error) {
      console.error("Failed to save task to backend:", error);
      // Remove from local store if backend save fails
      store.removeUpload(slideId, taskIndex);
      throw error; // Re-throw to allow component to handle the error
    }
  };

  // Wrap updateMaxSlideReached to also save to backend
  const updateMaxSlideReachedWithAPI = async (slideIndex: number) => {
    const currentMax = store.getMaxSlideReached(meetingId);

    // Only update if this is a new max
    if (slideIndex > currentMax) {
      // Update local store first
      store.updateMaxSlideReached(meetingId, slideIndex);

      // Then save to backend
      try {
        await meetingAPI.updateProgress(meetingId, slideIndex, slideIndex);
      } catch (error) {
        console.error("Failed to save progress to backend:", error);
      }
    }
  };

  // Wrap saveMeetingHistory to also save to backend
  const saveMeetingHistoryWithAPI = async (
    lastSlideIndex: number,
    totalQuestions: number,
    correctAnswers: number,
  ) => {
    // Save to local store first
    store.saveMeetingHistory(
      meetingId,
      lastSlideIndex,
      totalQuestions,
      correctAnswers,
    );

    // Then save to backend
    try {
      const percentage =
        totalQuestions > 0
          ? Math.round((correctAnswers / totalQuestions) * 100)
          : 0;

      await meetingAPI.completeMeeting(
        meetingId,
        totalQuestions,
        correctAnswers,
        percentage,
      );
    } catch (error) {
      console.error("Failed to complete meeting in backend:", error);
    }
  };

  // Wrap removeUpload to also sync with backend
  const removeUploadWithAPI = async (slideId: number, taskIndex: number) => {
    // Remove from local store first
    store.removeUpload(slideId, taskIndex);

    // Then remove from backend
    try {
      await meetingAPI.removeTaskUpload(meetingId, slideId, taskIndex);
    } catch (error) {
      console.error("Failed to remove task from backend:", error);
    }
  };

  return {
    ...store,
    saveAnswer: saveAnswerWithAPI,
    saveUpload: saveUploadWithAPI,
    updateMaxSlideReached: updateMaxSlideReachedWithAPI,
    saveMeetingHistory: saveMeetingHistoryWithAPI,
    removeUpload: removeUploadWithAPI,
    isLoading,
  };
};
