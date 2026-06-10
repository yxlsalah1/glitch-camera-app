import { create } from 'zustand';
import type { GlitchEffect, EffectStoreState } from '../types';

export const useEffectStore = create<EffectStoreState>((set) => ({
  activeEffects: [],
  masterIntensity: 1.0,

  addEffect: (effect: GlitchEffect) =>
    set((state) => ({
      activeEffects: [...state.activeEffects, effect],
    })),

  removeEffect: (effectId: string) =>
    set((state) => ({
      activeEffects: state.activeEffects.filter((e) => e.id !== effectId),
    })),

  updateEffect: (effectId: string, updates: Partial<GlitchEffect>) =>
    set((state) => ({
      activeEffects: state.activeEffects.map((e) =>
        e.id === effectId ? { ...e, ...updates } : e
      ),
    })),

  setMasterIntensity: (intensity: number) =>
    set({ masterIntensity: Math.max(0, Math.min(1, intensity)) }),
}));
