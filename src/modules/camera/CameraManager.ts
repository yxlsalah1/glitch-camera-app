import { Camera } from 'expo-camera';
import { CameraType } from 'expo-camera';
import type { FrameData, CameraConfig } from '../../types';

/**
 * Camera capture manager
 * Handles camera initialization, permissions, and frame capture
 */
export class CameraManager {
  private cameraRef: Camera | null = null;
  private config: CameraConfig;
  private isCapturing = false;
  private onFrameCallback: ((frame: FrameData) => void) | null = null;

  constructor(config?: Partial<CameraConfig>) {
    this.config = {
      width: config?.width || 1280,
      height: config?.height || 720,
      fps: config?.fps || 30,
      facing: config?.facing || 'back',
    };
  }

  /**
   * Request camera permissions
   */
  public async requestPermissions(): Promise<boolean> {
    try {
      const { granted } = await Camera.requestCameraPermissionsAsync();
      return granted;
    } catch (error) {
      console.error('Camera permission request failed:', error);
      return false;
    }
  }

  /**
   * Initialize camera
   */
  public async initialize(cameraRef: Camera): Promise<void> {
    this.cameraRef = cameraRef;
  }

  /**
   * Start capturing frames
   */
  public startCapture(onFrame: (frame: FrameData) => void): void {
    this.onFrameCallback = onFrame;
    this.isCapturing = true;
  }

  /**
   * Stop capturing frames
   */
  public stopCapture(): void {
    this.isCapturing = false;
    this.onFrameCallback = null;
  }

  /**
   * Take a snapshot
   */
  public async takeSnapshot(): Promise<string | null> {
    if (!this.cameraRef) return null;
    try {
      const photo = await this.cameraRef.takePictureAsync();
      return photo.uri;
    } catch (error) {
      console.error('Failed to take snapshot:', error);
      return null;
    }
  }

  /**
   * Switch camera (front/back)
   */
  public toggleCameraFacing(): void {
    this.config.facing = this.config.facing === 'front' ? 'back' : 'front';
  }

  /**
   * Get camera type for Expo
   */
  public getCameraType(): CameraType {
    return this.config.facing === 'front' ? CameraType.front : CameraType.back;
  }

  public getConfig(): CameraConfig {
    return this.config;
  }

  public cleanup(): void {
    this.stopCapture();
    this.cameraRef = null;
  }
}
