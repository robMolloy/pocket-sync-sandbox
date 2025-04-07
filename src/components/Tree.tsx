import { ChevronRight, File, Folder } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

type TFile = {
  type: "file";
  fullPath: string;
  name: string;
};
type TDir = {
  type: "dir";
  fullPath: string;
  name: string;
  contents: TFileStructure;
};
type TFileStructure = (TFile | TDir)[];

export function convertPathsToTree(filePaths: string[]): TFileStructure {
  const root: TFileStructure = [];

  // Sort paths to ensure parent directories are processed before their children
  filePaths.sort();

  for (const filePath of filePaths) {
    let currentLevel = root;
    const pathParts = filePath.split("/");
    const pathSoFar = [];

    // Process each part of the path
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      pathSoFar.push(part);
      const fullPath = pathSoFar.join("/");

      // If this is the last part, it's a file
      if (i === pathParts.length - 1) {
        currentLevel.push({ type: "file", fullPath, name: part });
      } else {
        // This is a directory
        // Check if the directory already exists at the current level
        let dirNode = currentLevel.find(
          (node) => node.type === "dir" && node.name === part
        );

        if (!dirNode) {
          // If not, create it
          dirNode = { type: "dir", name: part, fullPath, contents: [] };
          currentLevel.push(dirNode);
        }

        // Move to the next level
        currentLevel = (dirNode as TDir).contents;
      }
    }
  }

  return root;
}

const TreeFile = (p: { data: TFile; active: string; prefix: string }) => {
  return (
    <SidebarMenuButton
      isActive={p.data.fullPath === p.active}
      className="data-[active=true]:bg-secondary"
    >
      <File />
      {p.data.name}
    </SidebarMenuButton>
  );
};

const TreeDir = (p: { data: TDir; activePath: string; prefixPath: string }) => {
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={p.activePath?.startsWith(p.data.fullPath)}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="transition-transform" />
            <Folder />
            {p.data.name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <Tree
              data={p.data.contents}
              prefixPath={p.data.name + "/"}
              activePath={p.activePath}
            />
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};

export function Tree(p: {
  data: TFileStructure;
  activePath?: string;
  prefixPath?: string;
}) {
  const sortedData = p.data.sort((a, b) => (a.name < b.name ? -1 : 1));
  const activePath = p.activePath ?? "";
  const prefixPath = p.prefixPath ?? "";

  return (
    <>
      {sortedData
        .filter((x) => x.type === "dir")
        .map((item) => {
          return (
            <TreeDir
              key={`${p.prefixPath}${item.name}`}
              data={item}
              activePath={activePath}
              prefixPath={prefixPath}
            />
          );
        })}
      {sortedData
        .filter((x) => x.type === "file")
        .map((item) => {
          return (
            <TreeFile
              key={`${p.prefixPath}${item.name}`}
              data={item}
              active={activePath}
              prefix={prefixPath}
            />
          );
        })}
    </>
  );
}
