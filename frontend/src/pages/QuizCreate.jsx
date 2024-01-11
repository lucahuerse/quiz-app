import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EmojiPicker } from "@/components/ui/emoji-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  category: z.string().min(1, { required_error: "Category must be at least one character long" }),
  emoji: z.string().emoji({ required_error: "Emoji must be a valid emoji" }),
  difficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "Pleses select a difficulty.",
  }),
  questions: z
    .array(
      z.object({
        question_text: z.string().min(1),
        answers: z
          .array(z.object({ answer_text: z.string().min(1), is_correct: z.boolean() }))
          .min(4)
          .max(4),
      }),
    )
    .min(1),
});

const QuizCreate = ({ onQuizCreated }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      emoji: "",
      difficulty: undefined,
      questions: [{ question_text: "", answers: Array(4).fill({ answer_text: "", is_correct: false }) }],
    },
  });

  const handleAddQuestion = () => {
    form.setValue("questions", [...form.watch("questions"), { question_text: "", answers: Array(4).fill({ answer_text: "", is_correct: false }) }]);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const { errors } = form.formState;

    if (!Object.keys(errors).length) {
      const result = await fetch(`https://rnxlf-37-24-135-241.a.free.pinggy.link/api/add_question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      console.log(result);
      console.log("submitted");

      toast({
        title: "Quiz Created",
        description: "Your quiz has been created",
      });

      // Call the onQuizCreated callback if provided
      if (onQuizCreated) {
        onQuizCreated();
      }
    } else {
      const errorMessage = errors[Object.keys(errors)[0]]?.message;
      console.log(errorMessage);

      toast({
        title: "Error",
        description: errorMessage || "Please fill out all fields",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PlusIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[32rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Quiz</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-row items-end gap-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className=" flex-grow">
                      <FormLabel className="text-right min-w-20">Category</FormLabel>
                      <Input {...field} placeholder="Category" className="col-span-3" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emoji"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Emoji</FormLabel>
                      <EmojiPicker {...field} />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4">
                <Card>
                  <ScrollArea className=" w-full h-[32rem]">
                    <CardHeader>
                      <CardTitle className="font-semibold text-lg">Add Questions</CardTitle>
                      <CardDescription>Enter at least one question with four answers each and select the correct answer.</CardDescription>
                    </CardHeader>
                    {form.watch("questions").map((_, question_index) => (
                      <CardContent key={question_index} className="flex flex-col justify-between gap-4">
                        <div className="flex flex-col justify-start gap-6">
                          <FormField
                            id="question"
                            control={form.control}
                            name={`questions.${question_index}.question_text`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col justify-start space-y-0 gap-2">
                                <FormLabel>Question</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Enter a question" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            id="answers"
                            control={form.control}
                            name={`questions.${question_index}.answers`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col justify-start space-y-0 gap-2">
                                <FormLabel>Answers</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    className="flex flex-col gap-2"
                                    onValueChange={(value) => {
                                      field.onChange(
                                        field.value.map((answer, index) => ({
                                          ...answer,
                                          is_correct: index === value,
                                        })),
                                      );
                                    }}
                                    defaultValue={field.value}
                                  >
                                    {field.value.map((_, answer_index) => (
                                      <FormItem key={answer_index} className="rounded-md bg-slate-800 flex flex-row justify-between items-center space-y-0">
                                        <div className="px-3">
                                          <FormControl>
                                            <RadioGroupItem value={answer_index} />
                                          </FormControl>
                                        </div>
                                        <div></div>
                                        <FormField
                                          control={form.control}
                                          name={`questions.${question_index}.answers.${answer_index}.answer_text`}
                                          render={({ field }) => (
                                            <FormItem className="flex-grow">
                                              <FormControl>
                                                <Input {...field} className="rounded-md" placeholder={`Option ${answer_index + 1}`} />
                                              </FormControl>
                                            </FormItem>
                                          )}
                                        />
                                      </FormItem>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    ))}
                  </ScrollArea>
                </Card>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="secondary" onClick={handleAddQuestion}>
                Add Question
              </Button>
              <Button type="submit">Done</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { QuizCreate };
