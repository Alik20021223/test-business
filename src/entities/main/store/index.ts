// @entities/main/store.ts
import { create } from 'zustand';
import type { IndicatorState } from '@entities/main/types';
import { parseIndicator } from '@utils/index';

type MainState = {
  textA: string;
  indicatorA: IndicatorState;
  changeIndicatorA: (raw: string) => void;
  setTextA: (text: string) => void;

  textC: string;
  setTextC: (text: string) => void;
  indicatorC: IndicatorState;
  changeIndicatorC: (raw: string) => void;
};

export const useMainStore = create<MainState>()((set) => ({
  textA: "Drinking water isn't just about quenching your thirst. It plays a crucial role...",
  setTextA: (text) => set({ textA: text }),
  indicatorA: { n: '12', positive: false },
  changeIndicatorA: (raw) => set(() => ({ indicatorA: parseIndicator(raw) })),

  textC: "Drinking water isn't just about quenching your thirst. It plays a cru bbb ...",
  setTextC: (text) => set({ textC: text }),
  indicatorC: { n: '10', positive: false },
  changeIndicatorC: (raw) => set(() => ({ indicatorC: parseIndicator(raw) })),
}));
