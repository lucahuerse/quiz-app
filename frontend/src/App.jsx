import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/ui/theme-provider";
import { QuizContainer } from "./pages/QuizContainer";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="w-full h-full flex flex-row justify-center items-center p-3 md:p-8">
        <QueryClientProvider client={queryClient}>
          <QuizContainer />
        </QueryClientProvider>
      </main>
      <Toaster />
    </ThemeProvider>
  );
};

export { App };
