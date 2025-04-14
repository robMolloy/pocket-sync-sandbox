import { z } from "zod";
import { create } from "zustand";

// const File1 = File;

export const fileSchema = z.object({
  id: z.string(),
  // file: z.instanceof(File1),
  filePath: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type TState = z.infer<typeof fileSchema>[];

export const useFilesStore = create<{
  data: TState;
  setData: (x: TState) => void;
  clear: () => void;
}>()((set) => ({
  data: [],
  setData: (data) => set(() => ({ data })),
  clear: () => set(() => ({ data: undefined })),
}));
