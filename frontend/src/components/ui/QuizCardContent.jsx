import React from "react";
import { CardContent } from "./card";

const QuizCardContent = ({ children }) => <CardContent className="flex flex-col gap-2 border-b p-6 min-h-[400px]">{children}</CardContent>;

export { QuizCardContent };
