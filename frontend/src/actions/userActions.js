import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT,
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
