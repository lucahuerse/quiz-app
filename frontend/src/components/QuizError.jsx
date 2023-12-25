import React from "react";
import { QuizCardHeader } from "./ui/QuizCardHeader";
import { CardTitle } from "./ui/card";
import { ModeToggle } from "./ui/mode-toggle";
import { QuizCardContent } from "./ui/QuizCardContent";
import { TypographyH2 } from "./ui/typography_h2";
import { QuizCardFooter } from "./ui/QuizCardFooter";

const QuizError = ({ errorMessage }) => {
  return (
    <>
      <QuizCardHeader>
        <CardTitle>Quiz App</CardTitle>
        <ModeToggle />
      </QuizCardHeader>
      <QuizCardContent>
        <TypographyH2>{"An error has occurred: " + errorMessage}</TypographyH2>
      </QuizCardContent>
      <QuizCardFooter></QuizCardFooter>
    </>
  );
};

export { QuizError };
