import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { userLogin } from "../actions/userActions"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"
import FormContainer from "../components/FormContainer"
const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const LoggedinUser = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = LoggedinUser

  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      history.push("/products")
    }
  }, [dispatch, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userLogin(email, password))
  }

  return (
    <FormContainer className="py-3">
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="py-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="py-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="py-3"
            onClick={submitHandler}
          >
            Submit
          </Button>

          <Row className="py-3">
            <Col>
              New Customer <Link to={"/register"}>Register</Link>
            </Col>
          </Row>
        </Form>
      )}
    </FormContainer>
  )
}

export default LoginScreen
