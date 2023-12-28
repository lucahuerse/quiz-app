import { Badge } from "@/components/ui/badge";
import { PlayIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { Card, CardHeader, CardTitle } from "./card";

export function BadgeSecondary() {
  return <Badge variant="secondary">Secondary</Badge>;
}

const QuizMenuEntry = ({ id, category, emoji }) => {

  return (
    <Card>
      <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0">
        <div className="flex flex-col justify-between gap-2">
          <CardTitle className="flex flex-row justify-start gap-3">
            <span>{emoji}</span>
            <span>{category}</span>
          </CardTitle>
          <div className="flex flex-row justify-start gap-3 pt-3">
            <Badge variant="secondary">Questions: 5</Badge>
            <Badge variant="secondary">Easy</Badge>
          </div>
        </div>
        <Button asChild className="dark:bg-green-700 dark:text-green-bg-green-600 dark:hover:bg-green-600/80 bg-green-400 text-white flex-row justify-between gap-1 w-min">
          <Link to={`/quiz/${id}`}>
            <PlayIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
    </Card>
  );
};

export { QuizMenuEntry };
