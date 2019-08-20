import { API_KEY } from "../../config/config";
import * as actionTypes from "./actionTypes";
import axios from "../../axios-auth";

export const authStart = () => ({ type: actionTypes.AUTH_START });

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData: authData
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});

export const auth = (email, password, method) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`accounts:${method}?key=${API_KEY}`, {
        email,
        password,
        returnSecureToken: true
      })
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};
