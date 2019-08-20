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
  removeAuthInfoFromLocalStorage();
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime);
  };
};

function setAuthInfoToLocalstorage(expiresIn, token, userId) {
  const expiresInMilliseconds = expiresIn * 1000;
  const expirationTime = Date.now() + expiresInMilliseconds;
  localStorage.setItem(localStorageConstants.TOKEN, token);
  localStorage.setItem(localStorageConstants.EXPIRATION_TIME, expirationTime);
  localStorage.setItem(localStorageConstants.USER_ID, userId);
  return expiresInMilliseconds;
}

function removeAuthInfoFromLocalStorage() {
  localStorage.removeItem(localStorageConstants.TOKEN);
  localStorage.removeItem(localStorageConstants.EXPIRATION_TIME);
  localStorage.removeItem(localStorageConstants.USER_ID);
}

function getAuthInfoFromLocalStorage() {
  return {
    [localStorageConstants.TOKEN]: localStorage.getItem(
      localStorageConstants.TOKEN
    ),
    [localStorageConstants.USER_ID]: localStorage.getItem(
      localStorageConstants.USER_ID
    ),
    [localStorageConstants.EXPIRATION_TIME]: localStorage.getItem(
      localStorageConstants.EXPIRATION_TIME
    )
  };
}

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
        const userId = response.data.localId;
        const token = response.data.idToken;
        const expiresIn = parseInt(response.data.expiresIn);

        const expiresInMilliseconds = setAuthInfoToLocalstorage(
          expiresIn,
          token,
          userId
        );

        dispatch(authSuccess(token, userId));
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

export const authCheckState = () => {
  return dispatch => {
    const { token, userId, expirationTime } = getAuthInfoFromLocalStorage();
    if (!token || !expirationTime) {
      dispatch(authLogout());
    } else {
      const timeLeftToExpire = expirationTime - Date.now();
      if (timeLeftToExpire > 0) {
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(timeLeftToExpire));
      }
    }
  };
};
