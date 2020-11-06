import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function UserForm({ onNewUser }) {
	const [email, setEmail] = useState('')
	const [first_name, setFirstName] = useState('')
	const [last_name, setLastName] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	async function handleClick(e) {
		e.preventDefault()
		const user = { username, email, password, first_name, last_name }
		user.key = username
		const userJson = JSON.stringify(user)
		const response = await fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: userJson,
		})

		if (response.ok) {
			onNewUser(user)
			setEmail('')
			setFirstName('')
			setLastName('')
			setUsername('')
			setPassword('')
			setConfirmPassword('')
		}
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

								<Form.Group controlId='formBasicFirstName'>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										value={first_name}
										onChange={(e) => setFirstName(e.target.value)}
										type='text'
										placeholder='Enter first name'
									/>
								</Form.Group>

								<Form.Group controlId='formBasicPassword'>
									<Form.Label>Password</Form.Label>
									<Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
								</Form.Group>

								<Button onClick={handleClick} variant='primary'>
									Submit
								</Button>
							</Col>
							<Col md={6}>
								<Form.Group controlId='formBasicUsername'>
									<Form.Label>Username</Form.Label>
									<Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='Enter username' />
								</Form.Group>

								<Form.Group controlId='formBasicLastName'>
									<Form.Label>Last Name</Form.Label>
									<Form.Control value={last_name} onChange={(e) => setLastName(e.target.value)} type='text' placeholder='Enter last name' />
								</Form.Group>

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
						</Row>
					</Form>
				</Col>
			</Container>
		</>
	)
}
