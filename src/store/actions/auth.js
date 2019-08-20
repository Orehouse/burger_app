import { API_KEY } from "../../config/config";
import * as actionTypes from "./actionTypes";
import axios from "../../axios-auth";

export const authStart = () => ({ type: actionTypes.AUTH_START });

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});

export const authLogout = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime);
  };
};

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
        dispatch(authSuccess(response.data.idToken, response.data.localId));

        const expiresInMilliseconds = parseInt(response.data.expiresIn) * 1000;
        dispatch(checkAuthTimeout(expiresInMilliseconds));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
