import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TypographyH2 } from "@/components/ui/typography_h2";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, CheckCircledIcon, Cross2Icon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, CircleIcon } from "lucide-react";
import { useState } from "react";
import { QuizCardContent } from "../components/ui/QuizCardContent";
import { QuizCardFooter } from "../components/ui/QuizCardFooter";
import { QuizCardHeader } from "../components/ui/QuizCardHeader";
import { ModeToggle } from "../components/ui/mode-toggle";
import { QuizError } from "./QuizError";
import { QuizLoading } from "./QuizLoading";
import { QuizMenu } from "./QuizMenu";
import { QuizResult } from "./QuizResult";
import { useNavigate } from "react-router-dom";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [goneBack, setGoneBack] = useState(false);
  let [question, setQuestion] = useState();
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  let [selected, setSelected] = useState();
  const navigate = useNavigate();

  const [unlockedQuestions, setUnlockedQuestions] = useState([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/api/quiz_data");
      const data = await res.json();
      // await delay(1000);
      return data;
    },
  });

  const next = () => {
    if (index < data.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(data[index + 1]);
      setLock(false);
    } else {
      setResult(true);
    }
    setGoneBack(false);
  };

  const previous = () => {
    if (!goneBack) {
      if (index > 0) {
        setIndex((prevIndex) => prevIndex - 1);
        setQuestion(data[index - 1]);
        setLock(true);
        setGoneBack(true);
      }
    }
  };

  const checkAnswer = (answer) => () => {
    if (!lock) {
      setLock(true);

      if (answer.is_correct) {
        setScore((prev) => prev + 1);
      }
      setSelected(answer.answer_id);
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setScore(0);
    setResult(false);
  };

  if (isPending) return <QuizLoading />;
  if (error) return <QuizError errorMessage={error.message} />;
  if (result) return <QuizResult category={question.category} totalQuestions={data.length} score={score} reset={reset} />;

  if (question === undefined) setQuestion(data[index] ?? null);
  if (!question) return "No data";

  return (
    <>
      <QuizCardHeader>
        <CardTitle>Quiz - {question.category}</CardTitle>
        <div className="flex flex-row justify-between gap-2">
        <Button variant="destructive" size="icon" onClick={() => navigate("/")}>
          <Cross2Icon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <ModeToggle />
        </div>
      </QuizCardHeader>
      <QuizCardContent>
        <div className="flex flex-row justify-start gap-2">
          <TypographyH2 className="border-b-0">{index + 1}.</TypographyH2>
          <TypographyH2 className="border-b-0">{question.question_text}</TypographyH2>{" "}
        </div>
        {question.answers.map((answer) => (
          <Button
            key={answer.answer_id}
            variant="outline"
            className={cn(
              "justify-start text-left whitespace-pre-line py-2",

              lock ? "cursor-default" : "",
              lock && answer.is_correct
                ? "dark:bg-green-700 dark:text-green-bg-green-600 dark:hover:bg-green-600/80 bg-green-400"
                : answer.answer_id === selected && "dark:bg-red-700 dark:text-red-bg-red-600 dark:hover:bg-red-600/80 bg-red-400",
            )}
            disabled={lock ? (answer.is_correct ? false : answer.answer_id === selected ? false : true) : false}
            onClick={checkAnswer(answer)}
          >
            {lock ? answer.is_correct ? <CheckCircledIcon className="w-5 h-5 mr-2" /> : <CrossCircledIcon className="w-5 h-5 mr-2" /> : <CircleIcon className="w-5 h-5 mr-2" />}
            {answer.answer_text}
          </Button>
        ))}
        <div className="flex flex-row justify-between pt-3">
          <Button className="flex flex-row justify-between gap-1 w-min" disabled={index === 0 || goneBack || lock} aria-disabled={!lock} onClick={previous}>
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </Button>
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
};

export { Quiz };
