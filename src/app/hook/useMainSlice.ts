// hooks/useMainSlice.ts
import { useShallow } from 'zustand/shallow';
import { MainState, useMainStore } from '@entities/main/store';
import type { IndicatorState, SliceKey } from '@entities/main/types';

type SliceData = {
  text: string;
  setText: (t: string) => void;
  indicator: IndicatorState;
};

const selectors = {
  A: (s: MainState): SliceData => ({ text: s.textA, setText: s.setTextA, indicator: s.indicatorA }),
  B: (s: MainState): SliceData => ({ text: s.textB, setText: s.setTextB, indicator: s.indicatorB }),
  C: (s: MainState): SliceData => ({ text: s.textC, setText: s.setTextC, indicator: s.indicatorC }),
  D: (s: MainState): SliceData => ({ text: s.textD, setText: s.setTextD, indicator: s.indicatorD }),
  E: (s: MainState): SliceData => ({ text: s.textE, setText: s.setTextE, indicator: s.indicatorE }),
} as const;

export function useMainSlice(slice: SliceKey): SliceData {
  return useMainStore(useShallow(selectors[slice]));
}
