import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { authFetch } from '../auth'

export default function Profile() {
	const [email, setEmail] = useState('')
	const [first_name, setFirstName] = useState('')
	const [last_name, setLastName] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [birthday, setBirthday] = useState('')
	const [position, setPosition] = useState('')
	const [education, setEducation] = useState('')
	const [aboutMe, setAboutMe] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [postcode, setPostcode] = useState('')
	const [country, setCountry] = useState('')
	const [profilePicture, setProfilePicture] = useState('')

	async function fetchUserInfo() {
		const response = await authFetch('/api/user', {
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
		}
		return new Promise((resolve, reject) => {
			responseJson ? resolve(responseJson) : reject(errorJson.message)
		})
	}

	useEffect(() => {
		fetchUserInfo()
			.then((response) => {
				setEmail(response.user.email)
				setFirstName(response.user.first_name)
				setLastName(response.user.last_name)
				setUsername(response.user.username)
				setBirthday(response.user.birthdate)
				setAboutMe(response.user.about_me)
				setPosition(response.user.position)
				setEducation(response.user.education)
				setAddress(response.user.address)
				setCity(response.user.city)
				setPostcode(response.user.postcode)
				setCountry(response.user.country)
				setProfilePicture(response.user.profile_picture)
			})
			.catch((error) => {})
	}, [])

	async function requestUpdate() {
		const user = {
			username,
			email,
			password,
			first_name,
			last_name,
			birthday,
			position,
			education,
			aboutMe,
			address,
			city,
			postcode,
			country,
			profilePicture,
		}
		user.key = username

		const response = await authFetch('/api/user', {
			method: 'PUT',
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

	async function handleClick(e) {
		e.preventDefault()
		requestUpdate()
			.then((response) => {
				console.log(response.message)
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
						<h3>Update Profile</h3>
						<Row>
							<Col md={12} className='mx-auto text-center'>
								<h4>Account Information</h4>
							</Col>
							<Col md={6}>
								<Form.Group controlId='formBasicEmail'>
									<Form.Label>Email address</Form.Label>
									<Form.Control readOnly value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter email' />
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='formBasicUsername'>
									<Form.Label>Username</Form.Label>
									<Form.Control
										readOnly
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										type='text'
										placeholder='Enter username'
									/>
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

							<Col md={12} className='mx-auto text-center mt-3'>
								<h4>Personal Information</h4>
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
							<Col md={6}>
								<Form.Group controlId='formBasicBirthday'>
									<Form.Label>Birthday</Form.Label>
									<Form.Control value={birthday} onChange={(e) => setBirthday(e.target.value)} type='text' placeholder='Enter birthday' />
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='formBasicProfilePicture'>
									<Form.Label>Profile Picture</Form.Label>
									<Form.Control
										value={profilePicture}
										onChange={(e) => setProfilePicture(e.target.value)}
										type='text'
										placeholder='Enter profilePicture'
									/>
								</Form.Group>
							</Col>
							<Col md={12}>
								<Form.Group controlId='exampleForm.ControlTextarea1'>
									<Form.Label>About Me</Form.Label>
									<Form.Control as='textarea' rows={3} value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} placeholder='About me' />
								</Form.Group>
							</Col>

							<Col md={12} className='mx-auto text-center mt-3'>
								<h4>Detailed Information</h4>
							</Col>
							<Col md={6}>
								<Form.Group controlId='formBasicPosition'>
									<Form.Label>Position</Form.Label>
									<Form.Control value={position} onChange={(e) => setPosition(e.target.value)} type='text' placeholder='Enter position' />
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='exampleForm.ControlSelect1'>
									<Form.Label>Education</Form.Label>
									<Form.Control as='select' value={education} onChange={(e) => setEducation(e.target.value)}>
										<option>{education}</option>
										<option>Post Graduate</option>
										<option>Bachelors Degree</option>
										<option>Professional Degree</option>
										<option>Masters Degree</option>
										<option>Doctorate Degree</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='formBasicAddress'>
									<Form.Label>Address</Form.Label>
									<Form.Control value={address} onChange={(e) => setAddress(e.target.value)} type='text' placeholder='Enter address' />
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='formBasicCity'>
									<Form.Label>City</Form.Label>
									<Form.Control value={city} onChange={(e) => setCity(e.target.value)} type='text' placeholder='Enter city' />
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='formBasicPostcode'>
									<Form.Label>Postcode</Form.Label>
									<Form.Control value={postcode} onChange={(e) => setPostcode(e.target.value)} type='text' placeholder='Enter postcode' />
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId='formBasicCountry'>
									<Form.Label>Country</Form.Label>
									<Form.Control value={country} onChange={(e) => setCountry(e.target.value)} type='text' placeholder='Enter country' />
								</Form.Group>
							</Col>
						</Row>
						<Button onClick={handleClick} variant='primary'>
							Update
						</Button>
					</Form>
				</Col>
			</Container>
		</>
	)
}
