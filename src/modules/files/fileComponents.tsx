import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pb } from "@/config/pocketbaseConfig";
import { createFile, listFiles, subscribeToFiles } from "@/modules/files/dbFilesUtils";
import { Label } from "@radix-ui/react-label";
import { RecordModel, RecordSubscription } from "pocketbase";
import { useState } from "react";

export const SubscribeToFilesButton = (p: {
  onChange: (e: RecordSubscription<RecordModel>) => void;
}) => {
  return (
    <Button
      onClick={async () => {
        subscribeToFiles({
          pb,
          onChange: (e) => {
            console.log(e);
            p.onChange(e);
          },
        });
      }}
    >
      subscribeToFiles
    </Button>
  );
};

export const ListFilesButton = () => {
  return (
    <Button
      onClick={async () => {
        const resp = await listFiles({ pb });
        console.log(resp.success ? "list successful" : "list failed");
        console.log(resp.data);
      }}
    >
      ListFilesButton
    </Button>
  );
};

export const CreateFileForm = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <Card>
      <CardContent className="flex items-end gap-2 p-4">
        <div className="flex flex-1 flex-col gap-1">
          <Label htmlFor="file">Choose a file</Label>
          <Input
            id="file"
            type="file"
            placeholder="File"
            accept="image/*"
            onInput={(e) => {
              console.log(`LoginForm.tsx:${/*LL*/ 141}`, { e });

              const tempFiles = (e.target as unknown as { files: File[] })?.files;
              const tempFile = tempFiles?.[0];
              if (tempFile) setFile(tempFile);
              console.log(`LoginForm.tsx:${/*LL*/ 141}`, { tempFile });
            }}
          />
        </div>
        <Button
          className="self-end"
          disabled={!file}
          onClick={async () => {
            if (!file) return;
            const resp = await createFile({
              pb,
              data: { file, filePath: `file_${Math.random() * 10000000000}` },
            });
            console.log(resp);
          }}
        >
          Upload
        </Button>
      </CardContent>
    </Card>
  );
};
