import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TypographyH2 } from "@/components/ui/typography_h2";
import { ModeToggle } from "../mode-toggle";
import { Progress } from "@/components/ui/progress";
import { Card as ChartCard, Flex, ProgressCircle, Text } from "@tremor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRightIcon } from '@radix-ui/react-icons'


const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function QuizContainer() {
  return (
    <Card className="w-auto min-w-full md:max-w-[46rem] md:min-w-[46rem]">
      <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 border-b">
        <CardTitle>Quiz App</CardTitle>
        <ModeToggle />
      </CardHeader>
      <Quiz />
    </Card>
  );
}

const QuizCardContent = ({ children }) => <CardContent className="flex flex-col gap-2 border-b p-6 min-h-[337px]">{children}</CardContent>;
const QuizCardFooter = ({ children }) => <CardFooter className="flex flex-col gap-2 p-6">{children}</CardFooter>;

function Quiz() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/api/quiz_data");
      const data = await res.json();
      await delay(1000);
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
      <QuizCardContent>
        <TypographyH2>{"An error has occurred: " + error.message}</TypographyH2>
      </QuizCardContent>
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

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    console.log(index);
    setLock(false);
    setScore(0);
    setResult(false);
  };

  if (result)
    return (
      <>
        <QuizCardContent>
          <TypographyH2>Quiz completed!</TypographyH2>
          <div className="items-center flex flex-col gap-3 justify-center">
            <h3 className="text-center font-semibold text-xl p-3">
              You scored {score} out of {data.length} points.
            </h3>
            <ProgressCircle color="red" className="p-5" size="xl" value={(score / data.length) * 100}>
              <span className="text-lg text-white font-medium">{(score / data.length) * 100}%</span>
            </ProgressCircle>
          </div>
          <Button onClick={reset}>Reset</Button>
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
                  ? "bg-green-300 text-green-bg-green-400 hover:bg-green-400/90"
                  : answer.answer_id === selected
                    ? "bg-red-400 text-red-bg-red-400 hover:bg-red-400/90"
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
