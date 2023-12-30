import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Quiz } from "./Quiz";
import { QuizCreate } from "./QuizCreate";
import { QuizMenu } from "./QuizMenu";

const QuizContainer = () => {
  return (
    <Card className="w-auto min-w-full md:max-w-[46rem] md:min-w-[46rem]">
      <BrowserRouter>
        <Routes>
          <Route index element={<QuizMenu />} />
          <Route path="/menu" element={<QuizMenu />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/create_quiz" element={<QuizCreate />} />
        </Routes>
      </BrowserRouter>
    </Card>
  );
};

export { QuizContainer };
