import React, {useContext} from 'react'
import UserBar from '../user/UserBar'
import Header from '../Header'
import {Container, Navbar, Nav} from 'react-bootstrap'
import {StateContext} from '../contexts'
import {Link} from 'react-navi'

export default function HeaderBar (){
  const {state} = useContext(StateContext)
  const {user} = state

  return (
    <Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Brand href="/"><Header text = "My Todo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link><Link href="/users/"> User List</Link></Nav.Link>
          <Nav className="me-auto">
            {user.username && <Nav.Link><Link href="/todo/add">Add New Todo</Link></Nav.Link>}
          </Nav>
          <UserBar />
        </Navbar.Collapse>
      </Container>
      </Navbar>
  )
}
