import React from "react"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { userLogout } from "../actions/userActions"
const Header = () => {
  const LoggedinUser = useSelector((state) => state.userLogin)
  const { userInfo } = LoggedinUser
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(userLogout())
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fa fa-shopping-cart"> </i>Cart
              </Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name}>
                <LinkContainer to="/login">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa fa-user"></i>SignIn
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
