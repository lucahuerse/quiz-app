import React from "react";
import { QuizCardHeader } from "../components/ui/QuizCardHeader";
import { CardTitle } from "../components/ui/card";
import { ModeToggle } from "../components/ui/mode-toggle";
import { QuizCardContent } from "../components/ui/QuizCardContent";
import { TypographyH2 } from "../components/ui/typography_h2";
import { QuizCardFooter } from "../components/ui/QuizCardFooter";

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
