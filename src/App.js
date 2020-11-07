import React, { useEffect, useState } from 'react'
import './App.css'
import Profile from './components/Profile'
import Users from './components/Users'
import UserForm from './components/UserForm'
import Login from './components/Login'

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
			<Profile />
			<UserForm onNewUser={(user) => setUsers((currentUsers) => [...currentUsers, user])} />
			<Login />
		</div>
	)
}

export default App
