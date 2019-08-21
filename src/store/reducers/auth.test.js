import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(undefined, {
        type: actionTypes.AUTH_SUCCESS,
        token: "myToken",
        userId: "myUserId"
      })
    ).toEqual({
      token: "myToken",
      userId: "myUserId",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});
