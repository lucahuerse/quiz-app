import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QuizContainer } from "./pages/QuizContainer";
import { ThemeProvider } from "./components/ui/theme-provider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="w-full h-full flex flex-row justify-center items-center p-3 md:p-8">
        <QueryClientProvider client={queryClient}>
          <QuizContainer />
        </QueryClientProvider>
      </main>
    </ThemeProvider>
  );
};

export { App };
