import React from 'react'
import './App.css'
import Profile from './components/Profile'
import Users from './components/Users'
import UserForm from './components/UserForm'
import Login from './components/Login'
import Navigation from './components/Navigation'
import { useAuth } from './auth'
import { BrowserRouter as Router, Route } from 'react-router-dom'

//  --- INFO: APP ---
function App() {
	const [logged] = useAuth()
	const username = localStorage.username

	return (
		<div className='App'>
			{!logged && <UnauthenticatedApp />}
			{logged && username !== 'antoine.ratat' && <AuthenticatedApp />}
			{logged && username === 'antoine.ratat' && <AuthenticatedAdminApp />}
		</div>
	)
}

//  --- INFO: FUNCTIONS ---

function AuthenticatedAdminApp() {
	return (
		<>
			<Router>
				<Navigation />
				<Route path='/' exact component={Users} />
				<Route path='/Users' exact component={Users} />
				<Route path='/Profile' exact component={Profile} />
			</Router>
		</>
	)
}

function AuthenticatedApp() {
	return (
		<>
			<Router>
				<Navigation />
				<Route path='/' exact component={Profile} />
				<Route path='/Profile' exact component={Profile} />
			</Router>
		</>
	)
}

function UnauthenticatedApp() {
	return (
		<>
			<Router>
				<Navigation />
				<Route path='/' exact component={Login} />
				<Route path='/Login' exact component={Login} />
				<Route path='/Register' exact component={UserForm} />
			</Router>
		</>
	)
}

export default App
