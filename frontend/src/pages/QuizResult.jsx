import React from "react";
import { QuizCardHeader } from "../components/ui/QuizCardHeader";
import { CardTitle } from "../components/ui/card";
import { ModeToggle } from "../components/ui/mode-toggle";
import { QuizCardContent } from "../components/ui/QuizCardContent";
import { TypographyH2 } from "../components/ui/typography_h2";
import { ProgressCircle } from "@tremor/react";
import { Button } from "../components/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";
import { QuizCardFooter } from "../components/ui/QuizCardFooter";
import { Progress } from "../components/ui/progress";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const QuizResult = ({ category, emoji, totalQuestions, score, reset }) => {
  const finalScore = (score / totalQuestions) * 100;
  const navigate = useNavigate();

  return (
    <>
      <QuizCardHeader>
        <CardTitle className="flex flex-row justify-start gap-2">
          <span>{emoji}</span>
          <span>{category}</span>
        </CardTitle>
        <ModeToggle />
      </QuizCardHeader>
      <QuizCardContent className="items-center flex flex-col gap-3 justify-center">
        <div className="items-center flex flex-col gap-3 justify-center">
          <TypographyH2 className="border-b-0">Quiz completed!</TypographyH2>
          <h3 className="text-center font-semibold text-xl p-3 pt-0">
            You scored {score} out of {totalQuestions} points.
          </h3>
          <ProgressCircle color={finalScore >= 90 ? "green" : finalScore >= 80 ? "yellow" : finalScore >= 60 ? "orange" : "red"} className="p-3" size="xl" value={(score / totalQuestions) * 100}>
            <span className="text-lg dark:text-white text-black font-medium">{(score / totalQuestions) * 100}%</span>
          </ProgressCircle>
          <div className="flex flex-row justify-between gap-2">
            <Button className="flex flex-row justify-between gap-1 w-min" onClick={reset}>
              Try again
              <ResetIcon className="h-4 w-4" />
            </Button>
            <Button variant="destructive" className="flex flex-row justify-between gap-1 w-min" onClick={() => navigate("/")}>
              <Cross2Icon className="w-5 h-5" />
              Quit
            </Button>
          </div>
        </div>
      </QuizCardContent>
      <QuizCardFooter>
        <Progress className="h-2" value={100} />
        {totalQuestions} of {totalQuestions}
      </QuizCardFooter>
    </>
  );
};

export { QuizResult };
