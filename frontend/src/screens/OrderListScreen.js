import React, { useState, useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getAllOrders } from "../actions/orderActions"

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const LoggedinUser = useSelector((state) => state.userLogin)
  const { userInfo } = LoggedinUser

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders())
    } else {
      history.push("/login")
    }
  }, [dispatch, userInfo])

  return (
    <>
      <h1>Orders</h1>

      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Paid</th>
              <th>Delievered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>

                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    {order.delivered ? (
                      order.deliveredAt.substring(0,10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    <LinkContainer Container to={`/admin/orders/${order._id}`}>
                      <Button variatnt="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
