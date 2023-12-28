import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button } from "./button";
import { SmileIcon } from "lucide-react";
import { useState, useRef } from "react";

const EmojiPicker = ({}) => {
  const [emoji, setEmoji] = useState(null);
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <div ref={containerRef}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button asChild variant="outline" size="icon" aria-expanded={open}>
            {emoji != null ? (
              <span className="text-xl">{emoji}</span>
            ) : (
              <span className="text-xl">
                <SmileIcon className="h-[1.2rem] w-[1.2rem]" />
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto h-auto p-0 border-0 rounded-xl">
          <Picker
            data={data}
            previewPosition="none"
            theme="auto"
            style={{
              width: containerRef.current?.offsetWidth,
            }}
            container={containerRef.current}
            onEmojiSelect={(emoji) => {
              setEmoji(emoji.native);
              console.log(emoji.native);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { EmojiPicker };
