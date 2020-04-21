import React from "react"
import { Link, navigate } from "gatsby"
import { logout } from "../utils/auth"

export default () => {

	<h2>
		<a
	    href="/"
	    onClick={event => {
	      event.preventDefault()
	      logout(() => navigate(`/`))
	    }}
	  >
	    Logout
	  </a>
	</h2>

}