import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { useAuth, logout } from '../auth'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
	const [logged] = useAuth()
	const username = localStorage.username

	function disconnect() {
		logout()
		localStorage.removeItem('username')
	}

	return (
		<>
			<Navbar bg='light' variant='light'>
				<Navbar.Brand href='/'>JWT Auth</Navbar.Brand>
				<Nav className='mr-auto'>
					{!logged && (
						<>
							<NavLink exact activeClassName='current' to='/Login'>
								<li style={{ marginLeft: 10, listStyle: 'none' }}>Login</li>
							</NavLink>
							<NavLink exact activeClassName='current' to='/Register'>
								<li style={{ marginLeft: 10, listStyle: 'none' }}>Register</li>
							</NavLink>
						</>
					)}
					{logged && username === 'antoine.ratat' && (
						<NavLink exact activeClassName='current' to='/Users'>
							<li style={{ marginLeft: 10, listStyle: 'none' }}>Users</li>
						</NavLink>
					)}
					{logged && (
						<NavLink exact activeClassName='current' to='/Profile'>
							<li style={{ marginLeft: 10, listStyle: 'none' }}>Profile</li>
						</NavLink>
					)}
				</Nav>
				{logged && <Button onClick={disconnect}>Logout</Button>}
			</Navbar>
		</>
	)
}
