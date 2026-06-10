# GlitchCamera - Real-Time Video Glitch Effects App

A React Native mobile app that applies real-time GPU-accelerated glitch effects to live camera feeds. This is the MVP version of a datamosh-style video effects application.

## Features

✅ **Live Camera Preview**
- Front and back camera support
- Real-time effect processing at 30-60 FPS

✅ **GPU-Accelerated Glitch Effects**
- RGB split distortion
- Motion smear effect
- Frame blending / ghosting
- Scanline VHS effect
- Compression artifact simulation

✅ **Recording & Export**
- Record video with effects applied
- Save to device media library
- Optimized for mobile performance

## Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **GPU Rendering**: Expo GL (OpenGL ES / Metal)
- **Camera**: Expo Camera API
- **State Management**: Zustand
- **Video Processing**: Native modules (iOS/Android)

## Project Structure

```
src/
├── components/          # React Native UI components
│   ├── CameraScreen.tsx
│   ├── EffectControls.tsx
│   └── RecordingUI.tsx
├── shaders/            # GLSL shader files
│   ├── effects/
│   │   ├── rgbSplit.glsl
│   │   ├── motionSmear.glsl
│   │   ├── frameBlend.glsl
│   │   ├── scanlines.glsl
│   │   └── compression.glsl
│   └── base.glsl
├── modules/            # Core systems
│   ├── camera/
│   │   ├── CameraManager.ts
│   │   └── FrameCapture.ts
│   ├── shader/
│   │   ├── ShaderCompiler.ts
│   │   ├── ShaderEffects.ts
│   │   └── EffectPipeline.ts
│   ├── processing/
│   │   ├── FrameBuffer.ts
│   │   ├── GPURender.ts
│   │   └── FrameProcessor.ts
│   └── recording/
│       ├── RecordingManager.ts
│       ├── VideoEncoder.ts
│       └── FileExporter.ts
├── stores/             # Global state (Zustand)
│   ├── cameraStore.ts
│   ├── effectStore.ts
│   └── recordingStore.ts
├── types/              # TypeScript definitions
│   └── index.ts
└── App.tsx            # Root component
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- iOS: Xcode 15+
- Android: Android Studio with API 24+

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install Expo CLI** (if not already installed)
   ```bash
   npm install -g expo-cli
   ```

3. **Install native dependencies** (iOS/Android)
   ```bash
   expo prebuild --clean
   ```

### Running the App

**Development Mode:**
```bash
npm start

# iOS
npm run ios

# Android
npm run android
```

**Building for Release:**
```bash
# iOS
npm run build:ios

# Android
npm run build:android
```

## Architecture Overview

### 1. Camera Capture Pipeline
- Expo Camera API captures raw frames
- Frames fed into GPU processing pipeline
- Near real-time preview (30-60 FPS target)

### 2. GPU Shader System
- GLSL shaders compiled at runtime
- Fragment shaders process each frame
- Shader uniforms control effect parameters
- Support for texture-based post-processing

### 3. Frame Buffer Management
- Double/triple buffering for smooth playback
- Frame history maintained for motion effects
- Efficient GPU memory management

### 4. Recording Pipeline
- Two-stage approach:
  - **Stage 1**: Real-time preview (GPU)
  - **Stage 2**: Recorded frames post-processed (if needed)
- Video encoded to H.264/HEVC
- Output saved to device media library

### 5. Effect System
- Modular shader-based effects
- Real-time parameter adjustment
- Effect stacking/compositing
- Performance optimization (effect culling on low FPS)

## Key Components

### CameraManager
Handles camera initialization, frame capture, and permission management.

### ShaderCompiler
Compiles GLSL shaders, manages shader programs, handles uniforms.

### FrameProcessor
Manages frame buffers, GPU rendering pipeline, and effect application.

### RecordingManager
Handles video capture, encoding, and export to media library.

### EffectPipeline
Orchestrates shader effects, manages effect order and parameters.

## Performance Optimization

- GPU processing for all effects (no CPU-heavy operations)
- Frame rate limiting and adaptive quality
- Efficient texture management
- Shader compilation caching
- Memory pooling for frame buffers

## Development Roadmap

**Phase 1 (MVP)** ✅
- Basic camera preview
- Single effect shader
- Real-time frame processing

**Phase 2** 🔄
- Multiple effect combination
- Full datamosh algorithm
- Advanced recording pipeline

**Phase 3**
- Real-time video encoding
- Effect presets library
- Social sharing
- Mobile app store release

## Known Limitations

- Real-time datamosh (full motion detection) deferred to Phase 2
- Recording may require separate post-processing pass on low-end devices
- WebGL support limited (primarily iOS/Android)

## Troubleshooting

### Low FPS on Camera Preview
- Reduce effect complexity
- Disable unnecessary effects
- Lower resolution on older devices

### Shader Compilation Errors
- Check shader syntax in `src/shaders/`
- Verify WebGL version support
- Review browser/device GPU capabilities

### Camera Permission Issues
- iOS: Check Info.plist permissions
- Android: Check AndroidManifest.xml
- Clear app cache and reinstall

## License

MIT

## Contributing

Contributions welcome! Please see development guidelines.
