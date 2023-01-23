import Main from "@/layouts/main/Main"
import { usePrompt } from "@/contexts/prompt-context"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  const prompt = usePrompt()


  return (
      <Main>
        
        
      </Main>
  )
}

export default Home
