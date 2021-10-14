import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { getTopProducts } from '../actions/productActions'

import { useDispatch, useSelector } from 'react-redux'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector(state => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(getTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel className='bg-dark' pause='hover'>
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              className='d-block w-100'
            />
            <Carousel.Caption>
              <h2>
                {product.name}(${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
