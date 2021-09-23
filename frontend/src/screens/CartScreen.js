import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Form,
  ListGroupItem,
} from "react-bootstrap"

import Loader from "../components/Loader"
import Message from "../components/Message"
import { Link } from "react-router-dom"
import { addToCart, removeFromCart } from "../actions/cartActions"

const CartScreen = ({ match, location, history }) => {
  const product_id = match.params.id
  const product_quantity =
    location.search && Number(location.search.split("=")[1])

  const dispatch = useDispatch()

  useEffect(() => {
    if (product_id) {
      dispatch(addToCart(product_id, product_quantity))
    }
  }, [dispatch, product_quantity])

  //Remove from Cart
  const removeFromCartHandler = (product_id) => {
    dispatch(removeFromCart(product_id))
  }

  const checkOutHandler = () => {
    history.push("/login?shipping")
  }

  const cart = useSelector((state) => {
    return state.cart
  })
  const { cartItems } = cart

  return (
    <div>
      <Row>
        <Col md={7}>
          <h1>Shopping Cart</h1>
          {cartItems.length !== 0 ? (
            <ListGroup variant="flush">
              {cartItems.map((product) => (
                <ListGroup.Item key={product.product_id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${product.product_id}`}>
                        {product.name}
                      </Link>
                    </Col>
                    <Col md={2}>{product.price}</Col>

                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={product.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(
                              product.product_id,
                              Number(e.target.value)
                            )
                          )
                        }}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() =>
                          removeFromCartHandler(product.product_id)
                        }
                      >
                        <i class="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Message>
              Your Cart is Empty <Link to="/">Go Back </Link>
            </Message>
          )}
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                ${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0 ? true : false}
                  onClick={() => checkOutHandler()}
                >
                  {" "}
                  Proceed To Checkout{" "}
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Col md={2}>Hello</Col>
      </Row>
    </div>
  )
}

export default CartScreen
