import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuizContainer } from "./components/quiz/quiz";
import { ThemeProvider } from "./components/theme-provider";

const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="w-full h-full flex justify-center items-center p-3 md:p-8">
        <QueryClientProvider client={queryClient}>
          <QuizContainer />
        </QueryClientProvider>
      </main>
    </ThemeProvider>
  );
}
