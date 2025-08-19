import { create } from 'zustand';
import type { LayoutType, SliceKey } from '@entities/main/types';

type Item = { key: SliceKey; layout: LayoutType; selected: boolean };

type State = {
  items: Item[];
  focused: SliceKey | null; // где рамка
  editing: SliceKey | null; // кто в редакторе

  setFocus: (key: SliceKey | null) => void;
  setEditing: (key: SliceKey | null) => void;
  toggleSelected: (key: SliceKey) => void;
  setLayout: (key: SliceKey, layout: LayoutType) => void;

  focusNext: () => void;
  focusPrev: () => void;
};

const order: SliceKey[] = ['A', 'B', 'C', 'D', 'E'];

export const useBlocksStore = create<State>((set, get) => ({
  items: [
    { key: 'A', layout: 'onlyText', selected: false },
    { key: 'B', layout: 'imageText', selected: false },
    { key: 'C', layout: 'imgLeftText', selected: false },
    { key: 'D', layout: 'textImage', selected: false },
    { key: 'E', layout: 'imgLeftText', selected: false },
  ],
  focused: 'A',
  editing: null,

  setFocus: (key) => set({ focused: key }),
  setEditing: (key) => set({ editing: key }),

  toggleSelected: (key) =>
    set((s) => ({
      items: s.items.map((i) => (i.key === key ? { ...i, selected: !i.selected } : i)),
    })),

  setLayout: (key, layout) =>
    set((s) => ({ items: s.items.map((i) => (i.key === key ? { ...i, layout } : i)) })),

  focusNext: () => {
    const { focused } = get();
    if (!focused) return;
    const idx = order.indexOf(focused);
    set({ focused: order[Math.min(idx + 1, order.length - 1)] });
  },
  focusPrev: () => {
    const { focused } = get();
    if (!focused) return;
    const idx = order.indexOf(focused);
    set({ focused: order[Math.max(idx - 1, 0)] });
  },
}));
