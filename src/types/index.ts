// Camera Types
export interface CameraConfig {
  width: number;
  height: number;
  fps: number;
  facing: 'front' | 'back';
}

export interface FrameData {
  timestamp: number;
  width: number;
  height: number;
  data: Uint8Array;
}

// Shader Types
export interface ShaderProgram {
  id: string;
  vertexSource: string;
  fragmentSource: string;
  uniforms: Record<string, ShaderUniform>;
}

export interface ShaderUniform {
  name: string;
  type: 'float' | 'int' | 'vec2' | 'vec3' | 'vec4' | 'mat4' | 'texture';
  value: number | number[] | WebGLTexture;
}

export interface GlitchEffect {
  id: string;
  name: string;
  enabled: boolean;
  intensity: number;
  shader: ShaderProgram;
  uniforms: Record<string, any>;
}

// Frame Buffer Types
export interface FrameBuffer {
  id: string;
  texture: WebGLTexture | null;
  framebuffer: WebGLFramebuffer | null;
  width: number;
  height: number;
}

export interface FrameBufferPool {
  buffers: FrameBuffer[];
  size: number;
  currentIndex: number;
}

// Recording Types
export interface RecordingConfig {
  width: number;
  height: number;
  fps: number;
  bitrate: number;
  codec: 'h264' | 'hevc';
}

export interface RecordingState {
  isRecording: boolean;
  duration: number;
  frameCount: number;
  fileSize: number;
}

// UI Types
export interface EffectControlProps {
  effect: GlitchEffect;
  onIntensityChange: (intensity: number) => void;
  onToggle: () => void;
}

export interface CameraScreenProps {
  onFrameProcessed?: (timestamp: number) => void;
}

// Store Types
export interface CameraStoreState {
  cameraFacing: 'front' | 'back';
  isPermissionGranted: boolean;
  setCameraFacing: (facing: 'front' | 'back') => void;
  setPermissionGranted: (granted: boolean) => void;
}

export interface EffectStoreState {
  activeEffects: GlitchEffect[];
  masterIntensity: number;
  addEffect: (effect: GlitchEffect) => void;
  removeEffect: (effectId: string) => void;
  updateEffect: (effectId: string, updates: Partial<GlitchEffect>) => void;
  setMasterIntensity: (intensity: number) => void;
}

export interface RecordingStoreState {
  isRecording: boolean;
  recordingDuration: number;
  startRecording: () => void;
  stopRecording: () => void;
  setRecordingDuration: (duration: number) => void;
}
