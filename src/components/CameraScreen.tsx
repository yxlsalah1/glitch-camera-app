import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { GLView } from 'expo-gl';
import { Camera } from 'expo-camera';
import { useCameraStore } from '../stores/cameraStore';
import { useEffectStore } from '../stores/effectStore';
import { useRecordingStore } from '../stores/recordingStore';
import EffectControls from './EffectControls';
import RecordingUI from './RecordingUI';
import { CameraManager } from '../modules/camera/CameraManager';

const CameraScreen: React.FC = () => {
  const { width, height } = Dimensions.get('window');\n  const cameraRef = useRef<Camera>(null);
  const glRef = useRef<GLView>(null);
  const cameraManager = useRef<CameraManager | null>(null);
  
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [glContext, setGlContext] = useState<WebGLRenderingContext | null>(null);
  
  const cameraFacing = useCameraStore((state) => state.cameraFacing);
  const setCameraFacing = useCameraStore((state) => state.setCameraFacing);
  const activeEffects = useEffectStore((state) => state.activeEffects);
  const isRecording = useRecordingStore((state) => state.isRecording);

  // Request camera permissions
  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  // Initialize GL context and camera
  useEffect(() => {
    if (!permission?.granted) return;

    const initializeCameras = async () => {
      if (cameraRef.current) {
        cameraManager.current = new CameraManager({
          width: 1280,
          height: 720,
          fps: 30,
          facing: cameraFacing,
        });
        await cameraManager.current.initialize(cameraRef.current);
      }
    };

    initializeCameras();

    return () => {
      cameraManager.current?.cleanup();
    };
  }, [permission?.granted, cameraFacing]);

  const handleGLContextCreate = async (gl: WebGLRenderingContext) => {
    setGlContext(gl);
    // Initialize GPU processing
  };

  const toggleCamera = () => {
    setCameraFacing(cameraFacing === 'front' ? 'back' : 'front');
  };

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Camera permission required</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera Preview with GL Overlay */}
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={cameraFacing === 'front' ? Camera.Constants.Type.front : Camera.Constants.Type.back}
          ratio="16:9"
        >
          {/* GL Context for shader effects */}
          <GLView
            ref={glRef}
            onContextCreate={handleGLContextCreate}
            style={styles.glView}
          />
        </Camera>
      </View>

      {/* Bottom Controls */}
      <View style={styles.controlsContainer}>
        {/* Camera Toggle */}
        <TouchableOpacity style={styles.flipButton} onPress={toggleCamera}>
          <Text style={styles.flipButtonText}>🔄</Text>
        </TouchableOpacity>

        {/* Recording Controls */}
        <RecordingUI />

        {/* Effects Indicator */}
        <View style={styles.effectsIndicator}>
          <Text style={styles.effectsText}>
            {activeEffects.length > 0 ? `${activeEffects.length} FX` : 'No FX'}
          </Text>
        </View>
      </View>

      {/* Effect Controls Panel */}
      <EffectControls />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  glView: {
    flex: 1,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButtonText: {
    fontSize: 24,
  },
  effectsIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(100, 200, 255, 0.3)',
    borderRadius: 12,
  },
  effectsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
});

export default CameraScreen;
