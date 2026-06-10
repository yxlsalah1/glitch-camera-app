import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useEffectStore } from '../stores/effectStore';
import EffectSlider from './EffectSlider';

const EffectControls: React.FC = () => {
  const activeEffects = useEffectStore((state) => state.activeEffects);
  const updateEffect = useEffectStore((state) => state.updateEffect);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Effects</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {activeEffects.length === 0 ? (
          <Text style={styles.noEffectsText}>No effects enabled</Text>
        ) : (
          activeEffects.map((effect) => (
            <View key={effect.id} style={styles.effectControl}>
              <EffectSlider
                effect={effect}
                onIntensityChange={(intensity) =>
                  updateEffect(effect.id, { intensity })
                }
              />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  scrollView: {
    flexGrow: 0,
  },
  effectControl: {
    marginRight: 12,
  },
  noEffectsText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
});

export default EffectControls;
