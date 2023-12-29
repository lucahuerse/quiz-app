import { QuizMenuEntry } from "@/components/ui/QuizMenuEntry";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { QuizCardContent } from "../components/ui/QuizCardContent";
import { QuizCardHeader } from "../components/ui/QuizCardHeader";
import { CardTitle } from "../components/ui/card";
import { ModeToggle } from "../components/ui/mode-toggle";
import { QuizCreate } from "./QuizCreate";
import { QuizError } from "./QuizError";
import { QuizLoading } from "./QuizLoading";
import { EmojiPicker } from "@/components/ui/emoji-picker";

const QuizMenu = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/categories`);
      const data = await res.json();
      // await delay(1000);
      return data;
    },
  });

  return (
    <>
      <QuizCardHeader>
        <CardTitle>Menu</CardTitle>
        <div className="flex flex-row justify-between gap-2">
          <QuizCreate />
          <ModeToggle />
        </div>
      </QuizCardHeader>
      <QuizCardContent className="items-center flex flex-col gap-3 justify-center border-b-0">
        {isPending && <QuizLoading />}
        {error && <QuizError />}
        {data && data.map((category) => <QuizMenuEntry key={category.id} id={category.id} category={category.name} emoji={category.emoji} difficulty={category.difficulty}/>)}
      </QuizCardContent>
    </>
  );
};

export { QuizMenu };
