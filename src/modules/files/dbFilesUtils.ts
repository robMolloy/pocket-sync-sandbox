import PocketBase, { RecordModel, RecordSubscription } from "pocketbase";

// const fileSchema = z.object({
//   id: z.string(),
//   // file: z.instanceof(File1),
//   filePath: z.string(),
//   createdAt: z.string(),
//   updatedAt: z.string(),
// });

export const subscribeToFiles = async (p: {
  pb: PocketBase;
  onChange: (e: RecordSubscription<RecordModel>) => void;
}) => {
  // Subscribe to changes in any record in the collection
  p.pb.collection("files").subscribe("*", (e) => {
    console.log(`dbFilesUtils.ts:${/*LL*/ 19}`, { e });
    p.onChange(e);
  });
  return { success: true } as const;
};

export const listFiles = async (p: { pb: PocketBase }) => {
  try {
    const data = await p.pb.collection("files").getFullList({
      sort: "-created",
    });
    return { success: true, data } as const;
  } catch (error) {
    return { success: false, error } as const;
  }
};

export const createFile = async (p: { pb: PocketBase; data: { file: File; filePath: string } }) => {
  try {
    const resp = await p.pb.collection("files").create(p.data);
    return { success: true, data: resp } as const;
  } catch (error) {
    return { success: false, error } as const;
  }
};
