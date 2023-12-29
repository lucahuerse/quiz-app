import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EmojiPicker } from "@/components/ui/emoji-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  category: z.string().min(1),
  emoji: z.string().emoji(),
  difficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "Difficulty must be easy, medium or hard",
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

const QuizCreate = () => {
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

    const result = await fetch(`http://127.0.0.1:8000/api/add_question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    console.log(result);
    console.log("submitted");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PlusIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[64rem]">
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
                      <Input {...field} placeholder="Category" className={cn("col-span-3", !!error && "border-red-400 focus-visible:ring-red-400")} />
                      <FormMessage />
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
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Difficutly</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ScrollArea className=" w-full md:h-64">
                <div className="flex flex-col gap-4">
                  {form.watch("questions").map((_, question_index) => (
                    <Card key={question_index}>
                      <CardHeader>
                        <CardTitle className="font-semibold text-lg">Add Question</CardTitle>
                        <CardDescription>Enter at least one question with four answers each and select the correct answer.</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col justify-between gap-4">
                        <div className="flex flex-col justify-start gap-6">
                          <FormField
                            control={form.control}
                            name={`questions.${question_index}.question_text`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Question</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Enter a question" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`questions.${question_index}.answers`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Possible answers...</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={(value) => {
                                      field.onChange(
                                        field.value.map((answer, index) => ({
                                          ...answer,
                                          is_correct: index === value,
                                        })),
                                      );
                                    }}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    {field.value.map((_, answer_index) => (
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value={answer_index} />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          <FormField
                                            control={form.control}
                                            name={`questions.${question_index}.answers.${answer_index}.answer_text`}
                                            render={({ field }) => (
                                              <FormItem className="flex flex-row justify-start items-center gap-2">
                                                <FormControl>
                                                  <Input {...field} placeholder="Enter an answer" className="col-span-3" />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        </FormLabel>
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
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <DialogFooter>
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
