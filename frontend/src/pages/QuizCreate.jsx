import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EmojiPicker } from "@/components/ui/emoji-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusIcon } from "@radix-ui/react-icons";
import { Card } from "@tremor/react";
import { useState } from "react";

const QuizCreate = () => {
  const [formData, setFormData] = useState({
    question_text: "",
    category: "",
    emoji: "",
    difficulty: "",
    answers: Array(4).fill({ answer_text: "", is_correct: false }),
  });

  const handleCorrectAnswer = (value) => {
    let id = null;
    switch (value) {
      case "answer_1":
        id = 1;
        break;
      case "answer_2":
        id = 2;
        break;
      case "answer_3":
        id = 3;
        break;
      case "answer_4":
        id = 4;
        break;
      default:
        id = null;
    }

    if (id !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        answers: prevFormData.answers.map((answer, index) => ({
          ...answer,
          is_correct: index + 1 === id,
        })),
      }));
    }
  };

  const handleDone = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/add_question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PlusIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[32rem]">
        <DialogHeader>
          <DialogTitle>Add Quiz</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-row justify-start items-center gap-2">
            <Label htmlFor="category" className="text-right min-w-20">
              Category
            </Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => {
                setFormData((prevFormData) => ({ ...prevFormData, category: e.target.value }));
              }}
              placeholder="Category"
              className="col-span-3"
            />
            <EmojiPicker
              onEmojiSelect={(emoji) => {
                setFormData((prevFormData) => ({ ...prevFormData, emoji: emoji }));
              }}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Label htmlFor="username" className="text-right min-w-20">
              Difficulty
            </Label>
            {/* <Input id="username" placeholder="@peduarte" className="col-span-3" /> */}
            <Select
              value={formData.difficulty}
              onValueChange={(value) => {
                setFormData((prevFormData) => ({ ...prevFormData, difficulty: value }));
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row justify-end">
            <Card>
              <CardHeader>
                <CardTitle className="font-semibold text-lg">Add Question</CardTitle>
                <CardDescription>Enter at least one question with four answers each and select the correct answer.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-between gap-4">
                <div className="flex flex-col justify-start gap-2">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <Input
                      id="question"
                      value={formData.question_text}
                      onChange={(e) => {
                        setFormData((prevFormData) => ({ ...prevFormData, question_text: e.target.value }));
                      }}
                      placeholder="Enter a question"
                      className="col-span-3"
                    />
                  </div>
                  <RadioGroup
                    onValueChange={(value) => {
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        answers: prevFormData.answers.map((answer, index) => ({
                          ...answer,
                          is_correct: index === value,
                        })),
                      }));
                    }}
                  >
                    {formData.answers.map((answer, index) => (
                      <div key={"div." + index} className="flex flex-row justify-start items-center gap-2">
                        <RadioGroupItem key={"RGI." + index} value={index} />
                        <Input
                          key={"RGIinput." + index}
                          value={answer.answer_text}
                          onChange={(e) => {
                            setFormData((prevFormData) => {
                              const updatedAnswers = [...prevFormData.answers];
                              updatedAnswers[index] = { ...updatedAnswers[index], answer_text: e.target.value };
                              return { ...prevFormData, answers: updatedAnswers };
                            });
                          }}
                          placeholder="Enter answer"
                          className="col-span-3"
                        />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="flex flex-row justify-end">
                  <Button variant="secondary" onClick={() => {}}>
                    Add Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleDone}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { QuizCreate };
