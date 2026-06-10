import { create } from 'zustand';
import type { CameraStoreState } from '../types';

export const useCameraStore = create<CameraStoreState>((set) => ({
  cameraFacing: 'back',
  isPermissionGranted: false,

  setCameraFacing: (facing: 'front' | 'back') =>
    set({ cameraFacing: facing }),

  setPermissionGranted: (granted: boolean) =>
    set({ isPermissionGranted: granted }),
}));
