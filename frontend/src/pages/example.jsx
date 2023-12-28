import { Button } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import EmojiPicker from "@emoji-mart/react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import React, { useRef, useState } from "react";

const ExampleOfAnyPopoverInsideModal = () => {
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <div ref={containerRef}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            <span className="truncate">Something</span>
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{
            width: containerRef.current?.offsetWidth,
          }}
          container={containerRef.current}
        >
          <EmojiPicker />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { ExampleOfAnyPopoverInsideModal };
