import React from "react"
import { Link, navigate } from "gatsby"
import { logout, isLoggedIn } from "../utils/auth"

export default () => {

  if (isLoggedIn()) {
		return (
		<h2 style={{ marginLeft: `0.6em` }}>
			<a
		    href="/"
		    onClick={event => {
		      event.preventDefault()
		      logout(() => navigate(`/`))
		    }}
		  >
		    Logout
		  </a>
		</h2>)
  } else {
    return <span/>;
	}
}