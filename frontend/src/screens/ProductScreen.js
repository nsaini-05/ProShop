import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productDetail, createProductReview } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const ProductDetailScreen = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const productDetails = useSelector(state => state.productDetail)
  const { error, product, loading } = productDetails

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { error: errorReview, success: successReview } = productReviewCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'PRODUCT_CREATE_REVIEW_RESET' })

    if (successReview) {
      alert('Review Submitted')
      setRating(0)
      setComment('')
    }

    dispatch(productDetail(match.params.id))
  }, [match, dispatch, quantity, successReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`)
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, { rating, comment }))
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error} </Message>
      ) : (
        product && (
          <>
            <Row>
              <Link to='/products'>
                <Button variant='light'>Go Back</Button>
              </Link>

              <Col md={6}>
                <img src={product.image} alt={product.name} />
              </Col>

              <Col md={3}>
                <ListGroup variant='flush'>
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
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out of Stock'}
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
                            as='select'
                            value={quantity}
                            onChange={e => {
                              setQuantity(e.target.value)
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(x => (
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
                        variant='dark'
                        className={
                          product.countInStock > 0 ? 'active' : 'disabled'
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
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {product && product.reviews.length === 0 && (
                  <Message>No Reviews</Message>
                )}
                <ListGroup variant='flush'>
                  {product &&
                    product.reviews.map(review => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)} </p>
                        <p>{review.comment} </p>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
                <ListGroup.Item>
                  <h2> Write a Review </h2>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating </Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>;
                          <option value='3'>3 - Fair</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>;
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' vairnat='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/'> Sign In </Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </Col>
            </Row>
          </>
        )
      )}
    </div>
  )
}

export default ProductDetailScreen
