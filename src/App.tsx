import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useCameraStore } from './stores/cameraStore';
import { useEffectStore } from './stores/effectStore';
import { useRecordingStore } from './stores/recordingStore';
import CameraScreen from './components/CameraScreen';

const App: React.FC = () => {
  const initializeCamera = useCameraStore((state) => state.setPermissionGranted);
  const initializeEffects = useEffectStore((state) => state.setMasterIntensity);

  useEffect(() => {
    initializeCamera(false);
    initializeEffects(1.0);
  }, [initializeCamera, initializeEffects]);

  return (
    <SafeAreaView style={styles.container}>
      <CameraScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;
