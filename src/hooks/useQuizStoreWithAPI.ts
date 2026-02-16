import { useQuizStore } from "@/stores/quizStore";
import { meetingAPI } from "@/services/api";
import { useEffect } from "react";

// Hook untuk mengintegrasikan zustand store dengan backend API
export const useQuizStoreWithAPI = (meetingId: string) => {
  const store = useQuizStore();

  // Load data from backend when component mounts
  useEffect(() => {
    const loadMeetingData = async () => {
      try {
        const data = await meetingAPI.getMeeting(meetingId);

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
      } catch (error) {
        console.error("Failed to load meeting data from backend:", error);
      }
    };

    loadMeetingData();
  }, [meetingId]);

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
    fileName: string,
    fileSize: number,
    fileType: string,
  ) => {
    // Save to local store first
    store.saveUpload(slideId, taskIndex, fileName, fileSize, fileType);

    // Then save to backend
    try {
      await meetingAPI.saveTaskUpload(
        meetingId,
        slideId,
        taskIndex,
        fileName,
        fileSize,
        fileType,
      );
    } catch (error) {
      console.error("Failed to save task to backend:", error);
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

  return {
    ...store,
    saveAnswer: saveAnswerWithAPI,
    saveUpload: saveUploadWithAPI,
    updateMaxSlideReached: updateMaxSlideReachedWithAPI,
    saveMeetingHistory: saveMeetingHistoryWithAPI,
  };
};
