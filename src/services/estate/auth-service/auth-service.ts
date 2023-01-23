import { instance } from "../instance"
import { noCrossOriginCookies } from "./auth-utils"

export const login = (payload: LoginPayload) => {
  return instance.post<LoginResponseType>("/admin/auth/login", payload, {
    headers: {
      "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    },
  })
}

export const refreshToken = () => {
  if (noCrossOriginCookies) {
    return instance.post<LoginResponseType>("/admin/auth/refresh-token")
  }
  return instance.post<LoginResponseType>(
    "/auth/refresh-token",
    {},
    { withCredentials: true }
  )
}

export const logout = () => {
  return instance.post<LogoutResponseType>("/admin/auth/logout")
}
