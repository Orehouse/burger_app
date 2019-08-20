import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: orderId,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return { type: actionTypes.PURCHASE_BURGER_FAIL, error: error };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("orders.json?auth=" + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return { type: actionTypes.PURCHASE_INIT };
};

export const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START };
};

export const fetchOrdersSuccess = orders => {
  return { type: actionTypes.FETCH_ORDERS_SUCCESS, orders: orders };
};

export const fetchOrdersFail = error => {
  return { type: actionTypes.FETCH_ORDERS_FAIL, error: error };
};

export const fetchOrders = token => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json?auth=" + token)
      .then(response => {
        const fetchedOrders = response.data;
        const orders = [];
        for (let orderId in fetchedOrders) {
          orders.push({
            ...fetchedOrders[orderId],
            id: orderId
          });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
