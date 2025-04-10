import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSelectedFilePathStore } from "@/stores/selectedFilePathStore";

export const Header = () => {
  const selectedFilePathStore = useSelectedFilePathStore();
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {selectedFilePathStore.data.split("/").map((x, j) => (
            <>
              {j > 0 && <BreadcrumbSeparator className="hidden md:block" />}
              <BreadcrumbItem className="hidden md:block" key={x}>
                <BreadcrumbLink href="#">{x}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Separator orientation="vertical" className="mr-2 h-4" />

      <ModeToggle />
    </header>
  );
};
