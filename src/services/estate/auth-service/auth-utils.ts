import Cookies from "js-cookie"
import jwtDecode from "jwt-decode"
import { instance } from "../instance"
import { logout, refreshToken } from "./auth-service"

const cookieDomain = "74.208.247.108:7337"

const testCrossOriginCookiesAllowed = () => {
  const randomString = String(Math.floor(Math.random() * 100000))
  Cookies.set("x-test-cookie", randomString, {
    sameSite: "none",
    secure: true,
    domain: cookieDomain,
  })
  const r = Cookies.get("x-test-cookie") === randomString
  Cookies.remove("x-test-cookie")
  r
    ? console.info("Cross origin cookies have ben set successfully")
    : console.warn(
        "Unable to set cross origin cookie. Please use SSL to get more security. Tokens will be sent in headers."
      )
  return r
}

export let noCrossOriginCookies = !testCrossOriginCookiesAllowed()

type TokenName = "accessToken" | "refreshToken"

export const getLocalToken = (name: TokenName) => Cookies.get(name) || ""

export const setLocalToken = (name: TokenName, value: string = "") => {
  if (!value) return Cookies.remove(name)
  if (noCrossOriginCookies) {
    Cookies.set(name, value, {})
  } else {
    Cookies.set(name, value, {
      sameSite: "none",
      secure: true,
      domain: cookieDomain,
    })
  }
}

//inject access token sending strategy
instance.interceptors.request.use(
  async (config) => {
    if (noCrossOriginCookies) {
      if (!config.headers) config.headers = {}
      if (config.url !== "/auth/refresh-token") {
        config.headers["x-access-token"] = getLocalToken("accessToken")
      } else {
        config.headers["x-access-token"] = getLocalToken("accessToken")
        config.headers["x-refresh-token"] = getLocalToken("refreshToken")
      }
      return config
    } else {
      config.withCredentials = true
      return config
    }
  },
  (error) => {
    Promise.reject(error)
  }
)

//inject access token refresh strategy
instance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const request = error.config
    if (
      //TODO: change to catch message JWT expired
      error.response.data.message?.includes("JWT expired") &&
      !request._retry &&
      request.url != "/auth/refresh-token"
    ) {
      request._retry = true

      return refreshToken()
        .then(({ data }) => {
          setLocalToken("refreshToken", data.refreshToken)
          setLocalToken("accessToken", data.accessToken)
          request.headers["x-access-token"] = data.accessToken
          return instance(request)
        })
        .catch(() => {
          setLocalToken("accessToken", "")
          setLocalToken("refreshToken", "")
          window.location.reload()
        })
      //return instance(request)
    }
    return Promise.reject(error)
  }
)

export const decode = (token: string = "") => {
  if (!token) return null
  const decoded: any = jwtDecode(token)
  if (decoded && Date.now() < decoded.exp * 1000) {
    return decoded
  }
  return null
}

export let decodedAccessToken = () => decode(getLocalToken("accessToken"))

if (getLocalToken("refreshToken") && !decodedAccessToken()) {
  refreshToken()
    .then(({ data }) => {
      setLocalToken("accessToken")
    })
    .catch(() => {
      setLocalToken("accessToken")
      setLocalToken("refreshToken")
      window.location.reload()
    })
}
if (!getLocalToken("refreshToken")) {
  setLocalToken("accessToken")
  setLocalToken("refreshToken")
}
