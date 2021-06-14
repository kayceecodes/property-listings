import * as actionTypes from './actionTypes'

export interface AddToCart {
    type: actionTypes.ADD_TO_CART
    payload: any
}

/**
 * addToCart - Adds 1 object. CartItems, which is an array of objects. 
 * @param cartItems 
 * @returns {cartItems}
 */
export const addToCart = (cartItems: any) => {
  return {
      type: actionTypes.ADD_TO_CART,
      cartItems: cartItems,
  }
}
