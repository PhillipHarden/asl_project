import React from 'react'

class Login extends React.Component
{
	render() {
		return (
			<div>
				<h1>Login</h1>
				<p>To login with github please click on the link below</p>
				<a href="https://github.com/login/oauth/authorize?client_id=5c7e7b4931784167cbff">Login With Github</a>
			</div>
		)
	}
}

export default Login