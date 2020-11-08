import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function UserForm() {
	const [email, setEmail] = useState('')
	const [first_name, setFirstName] = useState('')
	const [last_name, setLastName] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	async function createUser() {
		const user = { username, email, password, first_name, last_name }
		user.key = username

		const response = await fetch('/api/users', {
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
			responseJson ? resolve(responseJson) : reject(errorJson)
		})
	}

	function handleClick(e) {
		e.preventDefault()
		createUser()
			.then((response) => {
				console.log(response)
			})
			.catch((error) => {
				console.log(error.message)
			})
	}

	return (
		<>
			<Container>
				<Col>
					<Form className='mt-5'>
						<hr />
						<h3>Register</h3>
						<Row>
							<Col md={6}>
								<Form.Group controlId='formBasicEmail'>
									<Form.Label>Email address</Form.Label>
									<Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter email' />
								</Form.Group>
							</Col>
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
							<Col md={6}>
								<Form.Group controlId='formBasicPassword'>
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										type='password'
										placeholder='Password'
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='formBasicFirstName'>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										value={first_name}
										onChange={(e) => setFirstName(e.target.value)}
										type='text'
										placeholder='Enter first name'
									/>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='formBasicLastName'>
									<Form.Label>Last Name</Form.Label>
									<Form.Control value={last_name} onChange={(e) => setLastName(e.target.value)} type='text' placeholder='Enter last name' />
								</Form.Group>
							</Col>
							<Button onClick={handleClick} variant='primary' className='ml-3'>
								Register
							</Button>
						</Row>
					</Form>
				</Col>
			</Container>
		</>
	)
}
