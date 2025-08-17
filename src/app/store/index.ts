import { create } from 'zustand';

interface AppStateType {
  open: boolean;
}

export const useAppStore = create<AppStateType>((set) => ({
  open: false,
  setOpen: (value: boolean) => set({ open: value }),
}));
