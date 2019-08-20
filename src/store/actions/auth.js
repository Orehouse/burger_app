import { API_KEY } from "../../config/config";
import * as actionTypes from "./actionTypes";
import * as localStorageConstants from "../const/localStorage";
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

export const authLogout = () => {
  localStorage.removeItem(localStorageConstants.TOKEN);
  localStorage.removeItem(localStorageConstants.EXPIRATION_TIME);
  return { type: actionTypes.AUTH_LOGOUT };
};

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
        const expiresInMilliseconds = parseInt(response.data.expiresIn) * 1000;
        const expirationTime = Date.now() + expiresInMilliseconds;
        localStorage.setItem(
          localStorageConstants.TOKEN,
          response.data.idToken
        );
        localStorage.setItem(
          localStorageConstants.EXPIRATION_TIME,
          expirationTime
        );
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(expiresInMilliseconds));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return { type: actionTypes.SET_AUTH_REDIRECT_PATH, path: path };
};
