import React, { useEffect, useState } from 'react'
import './App.css'
import Users from './components/Users'

function App() {
	const [users, setUsers] = useState([])

	useEffect(() => {
		fetch('/api/users').then((response) => {
			response.json().then((data) => {
				setUsers(data.users)
			})
		})
	}, [])

	return (
		<div className='App'>
			<Users users={users} />
		</div>
	)
}

export default App
