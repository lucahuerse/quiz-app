import React from "react";
import { Card } from "./ui/card";
import { Quiz } from "./Quiz";

const QuizContainer = () => {
  return (
    <Card className="w-auto min-w-full md:max-w-[46rem] md:min-w-[46rem]">
      <Quiz />
    </Card>
  );
};

export { QuizContainer };
