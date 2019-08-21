import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

function purchaseInit(state) {
  return updateObject(state, { purchased: false });
}

function purchaseBurgerStart(state) {
  return updateObject(state, { loading: true });
}

function purchaseBurgerSuccess(action, state) {
  const newOrder = { ...action.orderData, id: action.orderId };
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  });
}

function purchaseBurgerFail(state) {
  return updateObject(state, { loading: false });
}

function fetchOrdersStart(state) {
  return updateObject(state, { loading: true });
}

function fetchOrdersSuccess(state, action) {
  return updateObject(state, { orders: action.orders, loading: false });
}

function fetchOrdersFail(state) {
  return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(action, state);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state);
    default:
      return state;
  }
};

export default reducer;
