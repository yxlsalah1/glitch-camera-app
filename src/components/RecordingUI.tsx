import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRecordingStore } from '../stores/recordingStore';

const RecordingUI: React.FC = () => {
  const isRecording = useRecordingStore((state) => state.isRecording);
  const startRecording = useRecordingStore((state) => state.startRecording);
  const stopRecording = useRecordingStore((state) => state.stopRecording);
  const recordingDuration = useRecordingStore((state) => state.recordingDuration);
  const setRecordingDuration = useRecordingStore((state) => state.setRecordingDuration);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(recordingDuration + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, recordingDuration, setRecordingDuration]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.recordButton,
          isRecording && styles.recordButtonActive,
        ]}
        onPress={handleToggleRecording}
      >
        <View
          style={[
            styles.recordIndicator,
            isRecording && styles.recordIndicatorActive,
          ]}
        />
      </TouchableOpacity>

      {isRecording && (
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>{formatTime(recordingDuration)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  recordButtonActive: {
    backgroundColor: 'rgba(255, 59, 48, 0.3)',
    borderColor: '#FF3B30',
  },
  recordIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  recordIndicatorActive: {
    backgroundColor: '#FF3B30',
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  durationContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 59, 48, 0.3)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  durationText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
});

export default RecordingUI;
