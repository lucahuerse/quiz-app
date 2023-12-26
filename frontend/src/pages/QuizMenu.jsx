import { useNavigate } from "react-router-dom";
import { QuizCardContent } from "../components/ui/QuizCardContent";
import { QuizCardHeader } from "../components/ui/QuizCardHeader";
import { CardTitle } from "../components/ui/card";
import { ModeToggle } from "../components/ui/mode-toggle";
import { QuizMenuEntry } from "@/components/ui/QuizMenuEntry";

const QuizMenu = () => {
  const navigate = useNavigate();
  return (
    <>
      <QuizCardHeader>
        <CardTitle>Menu</CardTitle>
        <ModeToggle />
      </QuizCardHeader>
      <QuizCardContent className="items-center flex flex-col gap-3 justify-center border-b-0">
        <QuizMenuEntry />
        <QuizMenuEntry />
        <QuizMenuEntry />
      </QuizCardContent>
    </>
  );
};

export { QuizMenu };
