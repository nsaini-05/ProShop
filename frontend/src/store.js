import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  productDetailReducer,
  productListReducer,
} from "./reducers/productReducers"

import { cartReducers } from "./reducers/cartReducers"
import { userLoginReducers, userRegisterReducer } from "./reducers/userReducers"

const reducers = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducers,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducer,
})

const cartItemsfromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const initialState = {
  cart: { cartItems: cartItemsfromStorage },
  userLogin: { userInfo: userInfo },
}

const middleware = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
