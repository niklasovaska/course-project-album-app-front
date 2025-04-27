import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/theme-provider'
import Login from './components/Login'
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient()

function App() {
  
    return(
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <div className='flex items-center justify-center h-screen'>
          <Toaster richColors/>
          <QueryClientProvider client={queryClient}>
            <Login />
          </QueryClientProvider>
        </div>
      </ThemeProvider>
    )
  
}

export default App
