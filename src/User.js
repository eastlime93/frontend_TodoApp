import React from 'react'
import {Container,Card} from 'react-bootstrap'
import {Link} from 'react-navi'

export default function User({_id, username, password}){
  return(
    <Container>
        <Card bg={"Light".toLowerCase()} text={"dark"}>
          <Card.Body>
              <Card.Title>User: <i>{username}</i></Card.Title>
              <Card.Text><Link href={`/users/${_id}`}> Go to {username}'s profile page </Link></Card.Text>
          </Card.Body>
        </Card>
      <br />
    </Container>
  )
}
