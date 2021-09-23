import React, { useEffect, useState } from "react"
import { Row, Col, ListGroup, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { productDetail } from "../actions/productActions"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { addToCart } from "../actions/cartActions"
const ProductDetailScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1)
  const productDetails = useSelector((state) => state.productDetail)
  const { error, product, loading } = productDetails
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productDetail(match.params.id))
  }, [match, dispatch, quantity])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`)
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error} </Message>
      ) : (
        product && (
          <Row>
            <Link to="/products">
              <Button variant="light">Go Back</Button>
            </Link>

            <Col md={6}>
              <img src={product.image} alt={product.name} />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price : {product.price}</ListGroup.Item>

                <ListGroup.Item>
                  <p>Description :{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Stock:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={quantity}
                          onChange={(e) => {
                            setQuantity(e.target.value)
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Row>
                    <Button
                      variant="dark"
                      className={
                        product.countInStock > 0 ? "active" : "disabled"
                      }
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        )
      )}
    </div>
  )
}

export default ProductDetailScreen
