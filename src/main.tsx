import React from "react"
import ReactDOM from "react-dom/client"
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/auth-context"
import "./index.css"
import Home from "./pages/app/Home/Home"
import Login from "./pages/auth/login/Login"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PromptProvider } from "./contexts/prompt-context"
import { FlagcardProvider } from "./contexts/flagcard-context"
import Company from "./pages/app/Company/Company"
import Agent from "./pages/app/Agent/Agent"
const queryClient = new QueryClient()
const base = import.meta.env.BASE_URL

const Router = () => {
  const auth = useAuth()
  if (!auth.value.state.isLoggedIn) {
    return (
      <BrowserRouter basename={base}>
        <Routes>
          <Route path="/auth">
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter basename={base}>
        <Routes>
          <Route path="/app">
            {/** viewer routes */}
            <Route path="home" element={<Home />} />
            <Route path="company" element={<Company />} />
            <Route path="agent" element={<Agent />} />
          </Route>
          <Route path="*" element={<Navigate to="/app/home" />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PromptProvider>
      <FlagcardProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </QueryClientProvider>
      </FlagcardProvider>
    </PromptProvider>
  </React.StrictMode>
)
