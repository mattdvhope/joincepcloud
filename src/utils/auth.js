export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : {}

const setUser = user =>
  window.localStorage.setItem("user", JSON.stringify(user))

export const handleLogin = person => {
  console.log(person);
  if (!isBrowser) return false
  return setUser(person)
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.name
}

export const logout = callback => {
  setUser({})
  callback()
}

// see 'https://www.gatsbyjs.org/docs/authentication-tutorial/'
// to learn how to set up "LOGIN" in Gatsby 2