import { BaseAuthStore } from "pocketbase";
import { create } from "zustand";

type TState = BaseAuthStore | null | undefined;

export const useAuthDataStore = create<{
  data: TState;
  setData: (x: TState) => void;
  clear: () => void;
}>()((set) => ({
  data: undefined,
  setData: (data) => set(() => ({ data })),
  clear: () => set(() => ({ data: undefined })),
}));
