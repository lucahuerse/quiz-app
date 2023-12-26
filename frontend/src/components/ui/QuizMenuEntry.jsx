import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { PlayIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuizMenuEntry = () => {
    const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0">
        <div className="flex flex-col justify-between gap-2">
          <CardTitle>Category</CardTitle>
          <CardDescription>5 Questions</CardDescription>
        </div>
        <Button onClick={() => navigate("/quiz")} className="flex flex-row justify-between gap-1 w-min">
          Start
          <PlayIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
    </Card>
  );
};

export { QuizMenuEntry };
