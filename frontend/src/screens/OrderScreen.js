import React, { useState, useEffect } from "react"
import { Row, Col, Button, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import { Link } from "react-router-dom"
import { getOrderDetails, payOrder } from "../actions/orderActions"
import Loader from "../components/Loader"
import { PayPalButton } from "react-paypal-button-v2"
import { ORDER_PAY_RESET } from "../constants/orderConstants"

import axios from "axios"

const OrderScreen = ({ history, match }) => {
  const [sdkReady, setSdkReady] = useState(false)
  const [runTimeError, setRunTimeError] = useState("")
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)

  const { order, error, loading } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const LoggedinUser = useSelector((state) => state.userLogin)
  const { userInfo } = LoggedinUser

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }

    if (userInfo && order && userInfo._id !== order.user._id) {
      setRunTimeError("Invalid Credentials to access this resource")
    }

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal")
      const script = document.createElement("script")
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(match.params.id))
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript()
        } else {
          setSdkReady(true)
        }
      }
    }
  }, [dispatch, successPay, match.params.id, order, LoggedinUser])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(order._id, paymentResult))
  }

  return runTimeError ? (
    <Message variant="danger">{runTimeError}</Message>
  ) : loading || !order ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="borderless">
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
              </p>

              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.delivered ? (
                <Message variant="success">
                  Delievered at {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delievered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup.Item>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`product/${item.product_id}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = $ {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid ? (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              ) : (
                <></>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
