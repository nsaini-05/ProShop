import React from "react"
import { Card, Button } from "react-bootstrap"

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
          <div className="my-3">
            {product.rating}from {product.numReviews}
          </div>
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>

        <Card.Text>{product.description}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}

export default Product
