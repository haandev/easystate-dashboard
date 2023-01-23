type LoginPayload = {
  username: string
  password: string
}

type LoginSuccessResponseType = SuccessResponseType<{
  accessToken: string
  refreshToken: string
}>


type LogoutResponseType = SuccessResponseType<null>

type LoginResponseType = LoginSuccessResponseType
