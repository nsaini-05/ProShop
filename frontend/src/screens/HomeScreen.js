import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { listProducts } from "../actions/productActions"
import Product from "../components/Product"

const HomeScreen = () => {
  // const [products, setProducts] = useState()
  const productList = useSelector((state) => state.productList)

  const { error, products, loading } = productList

  const dispatch = useDispatch()
  useEffect(() => {
    console.log("sadfadsf")
    dispatch(listProducts())
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
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
      )}
    </>
  )
}

export default HomeScreen
