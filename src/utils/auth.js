export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ first_name, last_name, email }) => {
  if (!isBrowser) return false
  return setUser({
    first_name: first_name,
    last_name: last_name,
    email: email,
  })
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.email
}

export const logout = callback => {
  setUser({})
  callback()
}

// see 'https://www.gatsbyjs.org/docs/authentication-tutorial/'
// to learn how to set up "LOGIN" in Gatsby 2