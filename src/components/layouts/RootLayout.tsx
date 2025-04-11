import { Header } from "@/components/layouts/Header";
import { LeftSidebar } from "@/components/layouts/LeftSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSelectedFilePathStore } from "@/stores/selectedFilePathStore";
import React from "react";
import { ModeToggle } from "../mode-toggle";

export function RootLayout(p: { children: React.ReactNode }) {
  const selectedFilePathStore = useSelectedFilePathStore();

  return (
    <SidebarProvider>
      <LeftSidebar />
      <SidebarInset>
        <Header
          leftChildren={
            <div className="flex h-12 items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {(() => {
                    const splitPath = selectedFilePathStore.data.split("/");
                    return splitPath.map((x, j) => {
                      const cumulativePath = splitPath.slice(0, j + 1).join("/");
                      return (
                        <React.Fragment key={cumulativePath}>
                          {j > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                          <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">{x}</BreadcrumbLink>
                          </BreadcrumbItem>
                        </React.Fragment>
                      );
                    });
                  })()}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          }
          rightChildren={
            <div className="flex items-center justify-end gap-2">
              <ModeToggle />
            </div>
          }
        />

        {p.children}
      </SidebarInset>
    </SidebarProvider>
  );
}
