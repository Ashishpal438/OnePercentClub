import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants';

export const addToCart = (product, qty) => async (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: product,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
