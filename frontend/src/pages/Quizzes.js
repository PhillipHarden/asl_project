import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import queryString from 'querystring'


const Quizzes = () => {
	const [quizzes, setQuizzes] = useState([])
	useEffect(() => {
		async function fetchQuizes() {
			const params = queryString.parse(window.location.search.replace(/^\?/, ''))
			const response = await axios('http://localhost:3000/quizzes', {
        headers: {
          token: localStorage.token
        }
      })
	  		setQuizzes(response.data)
		}
		fetchQuizes()
	}, []);
	return (
		<div>
			<h1>Take a Quiz!</h1>
			<p>Click on any quiz listed below to take one.</p>
			<ul className="list-group">
				{quizzes.map(q => (
					<li key={q.id}  className="list-group-item">
						<Link to={'/quizzes/' + q.id} className="decoration-none list-link">{q.name}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Quizzes