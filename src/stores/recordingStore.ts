import { create } from 'zustand';
import type { RecordingStoreState } from '../types';

export const useRecordingStore = create<RecordingStoreState>((set) => ({
  isRecording: false,
  recordingDuration: 0,

  startRecording: () =>
    set({
      isRecording: true,
      recordingDuration: 0,
    }),

  stopRecording: () =>
    set({
      isRecording: false,
    }),

  setRecordingDuration: (duration: number) =>
    set({ recordingDuration: duration }),
}));
