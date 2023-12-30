import { QuizCardContent } from "../components/ui/QuizCardContent";
import { QuizCardFooter } from "../components/ui/QuizCardFooter";
import { QuizCardHeader } from "../components/ui/QuizCardHeader";
import { CardTitle } from "../components/ui/card";
import { ModeToggle } from "../components/ui/mode-toggle";
import { Skeleton } from "../components/ui/skeleton";

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
