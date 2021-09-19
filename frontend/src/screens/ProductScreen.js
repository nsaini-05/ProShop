import React from "react"
import { Row, Col, ListGroup, Button } from "react-bootstrap"
import products from "../products"
import Rating from "../components/Rating"
import { Link } from "react-router-dom"
const ProductDetailScreen = ({ match }) => {
  const product = products.find((product) => product._id === match.params.id)
  return (
    <Row>
      <Link to="/products">
        <Button variant="light">Go Back</Button>
      </Link>

      <Col md={6}>
        <img src={product.image} alt={product.name} />{" "}
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
            ></Rating>{" "}
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
          <ListGroup.Item>
            <Row>
              <Button
                variant="dark"
                className={product.countInStock > 0 ? "active" : "disabled"}
              >
                Add To Cart
              </Button>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  )
}

export default ProductDetailScreen
