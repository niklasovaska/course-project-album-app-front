import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Login from './components/Login'

const queryClient = new QueryClient()

function App() {
  
    return(
      <>
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      </>
    )
  
}

export default App
