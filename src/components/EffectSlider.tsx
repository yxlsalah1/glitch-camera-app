import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import type { GlitchEffect } from '../types';

interface EffectSliderProps {
  effect: GlitchEffect;
  onIntensityChange: (intensity: number) => void;
}

const EffectSlider: React.FC<EffectSliderProps> = ({ effect, onIntensityChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.effectName}>{effect.name}</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>0%</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={effect.intensity}
          onValueChange={onIntensityChange}
          minimumTrackTintColor="#64C8FF"
          maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
          thumbTintColor="#64C8FF"
        />
        <Text style={styles.label}>100%</Text>
      </View>
      <Text style={styles.intensityValue}>
        {Math.round(effect.intensity * 100)}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  effectName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  slider: {
    flex: 1,
    height: 30,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    width: 20,
    textAlign: 'center',
  },
  intensityValue: {
    color: '#64C8FF',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default EffectSlider;
