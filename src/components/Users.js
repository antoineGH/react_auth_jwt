import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import { authFetch } from '../auth'

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

export default function Users() {
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
	return (
		<Container>
			<Row>
				<Col className='justify-content-center mt-3'>
					<h3 className='ml-3'>Consult (Admin)</h3>
					<Table bordered hover size='sm' className='text-center'>
						<thead>
							<tr>
								<th>Username</th>
								<th>Email</th>
								<th>First_name</th>
								<th>Last_name</th>
							</tr>
						</thead>
						<tbody>
							{users &&
								users.map((user) => {
									return (
										<tr key={user.username}>
											<td>{user.username}</td>
											<td>{user.email}</td>
											<td>{user.first_name}</td>
											<td>{user.last_name}</td>
										</tr>
									)
								})}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	)
}
