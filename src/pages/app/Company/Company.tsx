import Main from "@/layouts/main/Main"
import { usePrompt } from "@/contexts/prompt-context"
import { useNavigate } from "react-router-dom"

function Company() {
  const navigate = useNavigate()
  const prompt = usePrompt()


  return (
      <Main>
        
        test
        
      </Main>
  )
}

export default Company
