import React from "react"
import { Card, Button } from "react-bootstrap"
import Rating from './Rating'
const Product = ({ product }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <a href={`/products/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </a>
      <Card.Body>
        <a href={`/products/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

        <Card.Text as="div">
         <Rating value = {product.rating} text = {`${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>

        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}

export default Product
