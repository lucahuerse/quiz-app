import { Quiz } from "./Quiz";
import { QuizMenu } from "./QuizMenu";
import { Card } from "../components/ui/card";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const QuizContainer = () => {
  return (
    <Card className="w-auto min-w-full md:max-w-[46rem] md:min-w-[46rem]">
      <BrowserRouter>
        <Routes>
          <Route index element={<QuizMenu />} />
          <Route path="/" element={<QuizMenu />} />
          <Route path="/quiz/:id" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </Card>
  );
};

export { QuizContainer };
