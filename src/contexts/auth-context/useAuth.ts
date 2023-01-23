import { useContext, useMemo } from "react"
import useEvent from "react-use-event-hook"
import { authService } from "@/services/estate/auth-service"
import { setLocalToken } from "@/services/estate/auth-service/auth-utils"
import { AuthContext } from "./AuthContext"

export const useAuth = () => {
  const contextValue = useContext(AuthContext)
  if (!contextValue.provided) {
    throw new Error("useAuth must be used within a AuthProvier.")
  }

  const login = useEvent((payload: LoginPayload) => {
    return authService
      .login(payload)
      .then(({ data }) => {
        if (data) {
          setLocalToken("accessToken",data.accessToken)
          setLocalToken("refreshToken",data.refreshToken)
          contextValue.dispatch({
            type: "login",
            data: {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              username: payload.username,
            },
          })
        }
      })
      .catch(() => {
        setLocalToken("accessToken","")
        setLocalToken("refreshToken","")
        console.error(
          "Catched invalid login information or network non-stability"
        )
      })
  })

  const logout = useEvent(() => {
    setLocalToken("accessToken","")
    setLocalToken("refreshToken","")
    return authService.logout()
  })

  return useMemo(
    () => ({
      value: contextValue,
      login,
      logout,
    }),
    [contextValue]
  )
}
