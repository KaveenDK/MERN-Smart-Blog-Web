import api from "./api"

export const login = async (username: string, password: string) => {
  const res = await api.post("/auth/login", { email: username, password })

  return res.data
}

export const register = async (
  email: string,
  firstname: string,
  lastname: string,
  password: string
) => {
  const res = await api.post("/auth/register", {
    email,
    firstname,
    lastname,
    password
  })

  return res.data
}

export const getMyDetails = async () => {
  const res = await api.get("/auth/me")
  return res.data
}

export const refreshTokens = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh", {
    token: refreshToken
  })
  return res.data
}