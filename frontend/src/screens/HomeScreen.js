import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
const HomeScreen = ({ match }) => {
  // const [products, setProducts] = useState()
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const productList = useSelector(state => state.productList)
  const { error, products, loading, page, pages } = productList

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta title={'Welcome to ProShop'}></Meta>
      {!keyword ? <ProductCarousel> </ProductCarousel> : <></>}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products &&
            products.map(product => (
              <Col
                sm={12}
                md={6}
                lg={4}
                xl={4}
                className='my-3'
                key={product._id}
              >
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
    </>
  )
}

export default HomeScreen
