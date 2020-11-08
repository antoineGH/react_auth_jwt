import React, { useEffect, useState } from 'react'
import './App.css'
import Profile from './components/Profile'
import Users from './components/Users'
import UserForm from './components/UserForm'
import Login from './components/Login'
import { authFetch } from './auth'

//  --- INFO: FUNCTIONS ---

async function fetchUserInfo() {
	const response = await authFetch('/api/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	let responseJson = undefined
	let errorJson = undefined

	if (response.ok) {
		responseJson = await response.json()
	} else {
		if (response.status === 400) {
			errorJson = await response.json()
		}
		if (response.status === 401) {
			errorJson = await response.json()
		}
		if (response.status === 403) {
			errorJson = await response.json()
		}
	}
	return new Promise((resolve, reject) => {
		responseJson ? resolve(responseJson) : reject(errorJson)
	})
}

function allStorage() {
	var values = [],
		keys = Object.keys(localStorage),
		i = keys.length
	while (i--) {
		values.push(localStorage.getItem(keys[i]))
	}
	return values
}

//  --- INFO: APP ---

function App() {
	const [users, setUsers] = useState([])

	useEffect(() => {
		fetchUserInfo()
			.then((response) => {
				setUsers(response.users)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	// Check all localStorage
	useEffect(() => {
		console.log('Display Local Storage')
		const localStorage = allStorage()
		console.log(localStorage)
	}, [])

	return (
		<div className='App'>
			<Users users={users} />
			<Profile />
			<UserForm />
			<Login />
		</div>
	)
}

export default App
