import React from 'react'
import Quiz from './components/quiz/quiz'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Quiz />
    </QueryClientProvider>
  )
}