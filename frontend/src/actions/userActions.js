import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL
} from "../constants/userConstants"

import { ORDER_LIST_MY_RESET } from "../constants/orderConstants"

import axios from "axios"

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST })

    const config = {
      headers: { "Content-Type": "application/json" },
    }
    const { data } = await axios.post(
      "/users/login",
      {
        email: email,
        password: password,
      },
      config
    )

    dispatch({ type: LOGIN_SUCCESS, payload: data })
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const userLogout = () => async (dispatch) => {
  localStorage.removeItem("userInfo")
  localStorage.removeItem("paymentMethod")

  dispatch({ type: LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
}

export const userRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST })
    // const config = {
    //   headers: { "Content-Type": "application/json" },
    // }

    const { data } = await axios.post("/users/", {
      name: name,
      email: email,
      password: password,
    })
    dispatch({ type: REGISTER_SUCCESS, payload: data })
    dispatch({ type: LOGIN_SUCCESS, payload: data })
    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

//Action to get the loggedIn User Profile
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/users/${id}`, config)
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/users/profile`, user, config)
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}


//Action to get all users 

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }
    console.log("Reacherd")
    const { data } = await axios.get('/users', config)
    console.log(data)
    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    })
  }
}