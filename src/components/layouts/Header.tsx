import { ReactNode } from "react";

export const Header = (p: { leftChildren: ReactNode; rightChildren: ReactNode }) => {
  return (
    <header className="flex shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex-1">{p.leftChildren}</div>
      <div>{p.rightChildren}</div>
    </header>
  );
};
