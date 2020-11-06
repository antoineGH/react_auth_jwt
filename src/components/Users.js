import React from 'react'

export default function Users({ users }) {
	console.log(users)
	return (
		<div>
			<p>{users.length}</p>
		</div>
	)
}
