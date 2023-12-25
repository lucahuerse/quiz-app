import React from "react";
import { QuizCardHeader } from "./ui/QuizCardHeader";
import { QuizCardContent } from "./ui/QuizCardContent";
import { QuizCardFooter } from "./ui/QuizCardFooter";
import { CardTitle } from "./ui/card";
import { ModeToggle } from "./ui/mode-toggle";
import { Skeleton } from "./ui/skeleton";

const QuizLoading = () => {
  return (
    <>
      <QuizCardHeader>
        <CardTitle>Quiz App</CardTitle>
        <ModeToggle />
      </QuizCardHeader>
      <QuizCardContent>
        <div className="pb-3">
          <Skeleton className="h-[2.25rem] w-4/5" />
        </div>
        <Skeleton className="h-[2.5rem] w-full" />
        <Skeleton className="h-[2.5rem] w-full" />
        <Skeleton className="h-[2.5rem] w-full" />
        <Skeleton className="h-[2.5rem] w-full" />
        <Skeleton className="h-[2.5rem] w-full" />
      </QuizCardContent>
      <QuizCardFooter>
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-4 py-1 w-24" />
      </QuizCardFooter>
    </>
  );
};

export { QuizLoading };
