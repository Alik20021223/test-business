// @entities/main/store.ts
import { create } from 'zustand';
import type { IndicatorState } from '@entities/main/types';

export type MainState = {
  textA: string;
  setTextA: (text: string) => void;
  indicatorA: IndicatorState;

  textB: string;
  setTextB: (text: string) => void;
  indicatorB: IndicatorState;

  textC: string;
  setTextC: (text: string) => void;
  indicatorC: IndicatorState;

  textD: string;
  setTextD: (text: string) => void;
  indicatorD: IndicatorState;

  textE: string;
  setTextE: (text: string) => void;
  indicatorE: IndicatorState;
};

export const useMainStore = create<MainState>()((set) => ({
  textA: "Drinking water isn't just about quenching your thirst. It plays a crucial role...",
  setTextA: (text) => set({ textA: text }),
  indicatorA: { n: '12', positive: false },

  textB: 'Your body depends on water to survive. Every cell, tissue, and organ needs it...',
  setTextB: (text) => set({ textB: text }),
  indicatorB: { n: '8', positive: true },

  textC: "Drinking water isn't just about quenching your thirst. It plays a cru bbb ...",
  setTextC: (text) => set({ textC: text }),
  indicatorC: { n: '10', positive: false },

  textD: 'Proper hydration helps regulate temperature, keeps joints lubricated...',
  setTextD: (text) => set({ textD: text }),
  indicatorD: { n: '15', positive: true },

  textE: 'Staying hydrated also supports digestion, nutrient absorption, and more...',
  setTextE: (text) => set({ textE: text }),
  indicatorE: { n: '7', positive: false },
}));
