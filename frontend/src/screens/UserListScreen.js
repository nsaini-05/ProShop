import React, { useState, useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table , Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { userRegister } from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {listUsers} from "../actions/userActions"
const UserListScreen = () => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const{loading, error, users} = userList


  const deleteHandler = (id)=>{
    console.log(id)
  }

  useEffect(() => {
    dispatch(listUsers())
  },[dispatch])

 
    
  return (
    <>
    <h1>
      Users
    </h1>

    {loading ? (<Loader></Loader>) : error ? (<Message variant = "danger">{error}</Message>) :
    <Table  bordered hover responsive className ='table-sm'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Admin</th>
          <th></th>

        </tr>
      </thead>
      <tbody>
        { users && users.map(user => (<tr key = {user.id}>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td><a href = {`mailto:${user.email}`}>{user.email}</a></td>
          <td>
            {(user.isAdmin)  ?  <i className="fas fa-check" style={{ color: "green" }}></i> : <i className="fas fa-times" style={{ color: "red" }}></i>}
          </td>
          <td>
            <LinkContainer Container to = {`/user/${user._id}/edit`}>
              <Button variatnt = 'light' className = 'btn-sm'>
                <i className = 'fas fa-edit'></i>
              </Button>
            </LinkContainer>
            <Button variant = 'danger' className = 'btn-sm' onClick = {()=> deleteHandler(user._id)}>
            <i className = 'fas fa-trash'></i>
            </Button>

          </td>


        </tr>))}
    
      </tbody>
    </Table>
    
    
    }
    </>
  )
}

export default UserListScreen
