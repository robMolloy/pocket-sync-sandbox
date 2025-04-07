import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { convertPathsToTree, Tree } from "./Tree";

const filePaths = [
  "README.md",
  "app.tsx",
  "layout.tsx",
  "api/hello.ts",
  "components/ui.tsx",
  "components/button.tsx",
  "components/card.tsx",
  "components/components/ui.tsx",
  "components/components/button.tsx",
  "components/components/card.tsx",
  "components2/ui.tsx",
  "components2/button.tsx",
  "components2/card.tsx",
  "components2/components/ui.tsx",
  "components2/components/button.tsx",
  "components2/components/card.tsx",
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Files</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Tree
                data={convertPathsToTree(filePaths)}
                prefixPath=""
                activePath="components/components/card.tsx"
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
