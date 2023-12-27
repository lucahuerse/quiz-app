import * as React from "react";
import { cn } from "@/lib/utils";

const TypographyH2 = React.forwardRef(({ className, children }, ref) => {
  return (
    <h2 ref={ref} className={cn("scroll-m-20 pb-2 text-3xl font-semibold tracking-tight", className)}>
      {children}
    </h2>
  );
});

export { TypographyH2 };
