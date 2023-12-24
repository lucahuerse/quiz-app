import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography_h2";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, CheckCircledIcon, CrossCircledIcon, ResetIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { ProgressCircle } from "@tremor/react";
import { CircleIcon } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "../mode-toggle";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function QuizContainer() {
  return (
    <Card className="w-auto min-w-full md:max-w-[46rem] md:min-w-[46rem]">
      <Quiz />
    </Card>
  );
}

const QuizCardHeader = ({ children }) => <CardContent className="p-6 flex flex-row items-center justify-between space-y-0 border-b">{children}</CardContent>;
const QuizCardContent = ({ children }) => <CardContent className="flex flex-col gap-2 border-b p-6 min-h-[400px]">{children}</CardContent>;
const QuizCardFooter = ({ children }) => <CardFooter className="flex flex-col gap-2 p-6">{children}</CardFooter>;

function Quiz() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/api/quiz_data");
      const data = await res.json();
      // await delay(1000);
      return data;
    },
  });

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState();
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [selected, setSelected] = useState();

  if (isPending) {
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
          <p>
            <Skeleton className="h-4 py-1 w-24" />
          </p>
        </QuizCardFooter>
      </>
    );
  }

  if (error) {
    return (
      <>
        <QuizCardHeader>
          <CardTitle>Quiz App</CardTitle>
          <ModeToggle />
        </QuizCardHeader>
        <QuizCardContent>
          <TypographyH2>{"An error has occurred: " + error.message}</TypographyH2>
        </QuizCardContent>
        <QuizCardFooter></QuizCardFooter>
      </>
    );
  }

  if (question === undefined) setQuestion(data[index] ?? null);
  if (!question) return "No data";

  const checkAnswer = () => {
    if (!lock) {
      if (question.question_text === answer) {
        element.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        element.target.classList.add("incorrect");
        optionArray[question.ans - 1].current.classList.add("correct");
      }

      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
    }
  };

  const AnswerIcon = ({ lock, isCorrect }) => {
    if (!lock) return <CircleIcon className="w-5 h-5 mr-2" />;
    if (isCorrect) {
      return <CheckCircledIcon className="w-5 h-5 mr-2" />;
    } else {
      return <CrossCircledIcon className="w-5 h-5 mr-2" />;
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    console.log(index);
    setLock(false);
    setScore(0);
    setResult(false);
  };

  const final_score = (score / data.length) * 100;

  if (result)
    return (
      <>
        <QuizCardHeader>
          <CardTitle>Quiz - {question.category}</CardTitle>
          <ModeToggle />
        </QuizCardHeader>
        <QuizCardContent className="items-center flex flex-col gap-3 justify-center">
          <div className="items-center flex flex-col gap-3 justify-center">
            <TypographyH2 className="border-b-0">Quiz completed!</TypographyH2>
            <h3 className="text-center font-semibold text-xl p-3 pt-0">
              You scored {score} out of {data.length} points.
            </h3>
            <ProgressCircle color={final_score >= 90 ? "green" : final_score >= 80 ? "yellow" : final_score >= 60 ? "orange" : "red"} className="p-3" size="xl" value={(score / data.length) * 100}>
              <span className="text-lg dark:text-white text-black font-medium">{(score / data.length) * 100}%</span>
            </ProgressCircle>
          <Button className="flex flex-row justify-between gap-1 w-min" onClick={reset}>
            Try again 
            <ResetIcon className="h-4 w-4"/>
          </Button>
          </div>
        </QuizCardContent>
        <QuizCardFooter>
          <Progress className="h-2" value={((index + 1) / data.length) * 100} />
          {index + 1} of {data.length}
        </QuizCardFooter>
      </>
    );

  console.log(question.answers.map((answer) => <li onClick={(element) => checkAnswer(element, 1)}>{answer.answer_text}</li>));

  return (
    <>
      <QuizCardHeader>
        <CardTitle>Quiz - {question.category}</CardTitle>
        <ModeToggle />
      </QuizCardHeader>
      <QuizCardContent>
        <div className="flex flex-row justify-start gap-2">
          <TypographyH2 className="border-b-0">{index + 1}.</TypographyH2>
          <TypographyH2 className="border-b-0">{question.question_text}</TypographyH2>{" "}
        </div>
        {question.answers.map((answer) => (
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left whitespace-pre-line py-2",

              lock ? "cursor-default" : "",
              lock
                ? answer.is_correct
                  ? "dark:bg-green-700 dark:text-green-bg-green-600 dark:hover:bg-green-600/80 bg-green-400"
                  : answer.answer_id === selected
                    ? "dark:bg-red-700 dark:text-red-bg-red-600 dark:hover:bg-red-600/80 bg-red-400"
                    : ""
                : "",
            )}
            disabled={lock ? (answer.is_correct ? false : answer.answer_id === selected ? false : true) : false}
            onClick={() => {
              if (!lock) {
                if (answer.is_correct) setScore((prev) => prev + 1);
                setSelected(answer.answer_id);
                setLock(true);
              }
            }}
          >
            {lock ? answer.is_correct ? <CheckCircledIcon className="w-5 h-5 mr-2" /> : <CrossCircledIcon className="w-5 h-5 mr-2" /> : <CircleIcon className="w-5 h-5 mr-2" />}
            {answer.answer_text}
          </Button>
        ))}
        <div className="flex flex-row justify-end pt-3">
          <Button className="flex flex-row justify-between gap-1 w-min" aria-disabled={!lock} onClick={next}>
            Next
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </div>
      </QuizCardContent>
      <QuizCardFooter>
        <Progress className="h-2" value={(index / data.length) * 100} />
        <p>
          {index} of {data.length}
        </p>
      </QuizCardFooter>
    </>
  );
}
