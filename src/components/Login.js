import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { login } from '../auth'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	async function requestLogin() {
		const user = { username, password }
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
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
		}

		return new Promise((resolve, reject) => {
			responseJson ? resolve(responseJson) : reject(errorJson.message)
		})
	}

	function handleClick(e) {
		requestLogin()
			.then((response) => {
				if (response.access_token) {
					login(response)
					// Set localStorage
					localStorage.setItem('username', response.username)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<>
			<Container>
				<Col>
					<Form className='mt-5'>
						<hr />
						<h3>Login</h3>
						<Row>
							<Col md={6}>
								<Form.Group controlId='formBasicUsername'>
									<Form.Label>Username</Form.Label>
									<Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='Enter username' />
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='formBasicPassword'>
									<Form.Label>Password</Form.Label>
									<Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
								</Form.Group>
							</Col>
							<Button onClick={handleClick} variant='primary' className='ml-3'>
								Login
							</Button>
						</Row>
					</Form>
				</Col>
			</Container>
		</>
	)
}
