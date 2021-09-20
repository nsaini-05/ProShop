import React, { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
// import products from "../../products"
import Product from "../components/Product"
import axios from "axios"

const HomeScreen = () => {
  const [products, setProducts] = useState()

  const fetchProducts = async () => {
    const { data } = await axios.get("/products")
    setProducts(data)
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products &&
          products.map((product) => (
            <Col
              sm={12}
              md={6}
              lg={4}
              xl={4}
              className="my-3"
              key={product._id}
            >
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </>
  )
}

export default HomeScreen
