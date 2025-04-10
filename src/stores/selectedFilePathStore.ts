import { create } from "zustand";

type TState = string;

export const useSelectedFilePathStore = create<{
  data: TState;
  setData: (x: TState) => void;
  clear: () => void;
}>()((set) => ({
  data: "",
  setData: (data) => set(() => ({ data })),
  clear: () => set(() => ({ data: undefined })),
}));
