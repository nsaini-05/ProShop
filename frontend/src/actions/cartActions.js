import axios from "axios"
import store from "../store"
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants"

export const addToCart = (id, qty) => async (dispatch) => {
  const { data } = await axios(`/products/${id}`)
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product_id: id,
      name: data.name,
      price: data.price,
      qty: qty,
      image: data.image,
      countInStock: data.countInStock,
    },
  })

  localStorage.setItem(
    "cartItems",
    JSON.stringify(store.getState().cart.cartItems)
  )
}

// export const removeFromCart = (id) => async (dispatch) => {
//   cons
// }

export const removeFromCart = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, payload: id })
  localStorage.setItem(
    "cartItems",
    JSON.stringify(store.getState().cart.cartItems)
  )
}
