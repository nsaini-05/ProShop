import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants"

export const cartReducers = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload
      const productAlreadyInCart = state.cartItems.find(
        (product) => product.product_id === item.product_id
      )
      if (productAlreadyInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((product) =>
            product.product_id === item.product_id
              ? { ...product, qty: item.qty }
              : product
          ),
        }
      } else {
        // state.cartItems.push(item)
        // console.log(state)

        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case REMOVE_FROM_CART:
      const product_id = action.payload
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (product) => product.product_id !== product_id
        ),
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload }

    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload }

    default:
      return state
  }
}
