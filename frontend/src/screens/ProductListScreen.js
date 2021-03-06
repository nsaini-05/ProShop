import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct
} from '../actions/productActions'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const pageNumber = match.params.pageNumber || 1
  const { loading, error, products, pages, page } = productList

  const LoggedinUser = useSelector(state => state.userLogin)
  const { userInfo } = LoggedinUser

  const productCreate = useSelector(state => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
    success: successCreate
  } = productCreate

  const productDelete = useSelector(state => state.productDelete)

  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete
  } = productDelete

  useEffect(() => {
    dispatch({ type: 'PRODUCT_CREATE_RESET' })

    if (userInfo && userInfo.isAdmin) {
      if (successCreate) {
        history.push(`/admin/product/${createdProduct._id}`)
      }
      dispatch(listProducts('', pageNumber))
    } else {
      history.push('/login')
    }
  }, [
    dispatch,
    successDelete,
    userInfo,
    successCreate,
    createdProduct,
    pageNumber
  ])

  const deleteHandler = id => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct({}))
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map(product => (
                  <tr key={product.id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>

                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variatnt='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
