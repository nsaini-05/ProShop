import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../constants/userConstants"

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
  dispatch({ type: LOGOUT })
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
