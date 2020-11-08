import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'

export default function Users({ users }) {
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
