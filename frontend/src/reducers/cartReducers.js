import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants"

export const cartReducers = (state = { cartItems: [] }, action) => {
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

    default:
      return state
  }
}
