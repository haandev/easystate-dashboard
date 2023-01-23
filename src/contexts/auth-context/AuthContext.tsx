import React, { createContext, FC, PropsWithChildren, useReducer } from "react"
import {
  decode,
  decodedAccessToken,
  getLocalToken,
} from "@/services/estate/auth-service/auth-utils"

const initialAccessToken = getLocalToken("accessToken")
const initialRefreshToken = getLocalToken("refreshToken")
const initialState: AuthTypes.StateType = decode(initialAccessToken)
  ? {
      isLoggedIn: Boolean(initialAccessToken),
      accessToken: initialAccessToken,
      refreshToken: initialRefreshToken,
      username: decodedAccessToken()?.sub || "",
      roles: decodedAccessToken()?.roles,
    }
  : {
      isLoggedIn: false,
    }

const initialValue: AuthTypes.ValueType = {
  state: initialState,
  provided: false,
  dispatch: () => {},
}

const reducer: AuthTypes.ReducerType = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        refreshToken: action.data.refreshToken,
        username: action.data.username,
        accessToken: action.data.accessToken,
        isLoggedIn: true,
      }
    case "logout":
      return {
        ...state,
        refreshToken: undefined,
        username: undefined,
        accessToken: undefined,
        isLoggedIn: false,
      }
    default:
      return state
  }
}

export const AuthContext = createContext(initialValue)

export const AuthProvider: FC<PropsWithChildren<any>> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider
      {...props}
      value={{
        provided: true,
        dispatch,
        state,
      }}
    />
  )
}
