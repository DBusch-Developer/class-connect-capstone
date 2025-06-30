import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { authLogin, logout } from "./authSlice";

export const listenerMiddleware = createListenerMiddleware();

//Login
listenerMiddleware.startListening({
  matcher: isAnyOf(authLogin.fulfilled),
  effect: (action, listenerApi) => {
    console.log("listenerMiddleware authLogin.fulfilled effect");
    const token = action.payload.token;
    console.log("listenerApi.getState()", listenerApi.getState());
    console.log(action.payload)
    sessionStorage.setItem("token", token);
  },
  //  effect: (action, listenerApi) => {
  //    console.log("listenerMiddleware authLogin.fulfilled effect");
  //    const token =

  //      listenerApi.getState().auth.authUser?.token;
  //    if (token && typeof token === "string" && token.length > 0) {
  //      sessionStorage.setItem("token", token);
  //    } else if (token) {
  //      // If token is not a string, just store it as is
  //      sessionStorage.setItem("token", token);
  //    } else {
  //      console.warn("No token found in auth.user");
  //    }
  //  },
});

//Logout
listenerMiddleware.startListening({
  matcher: isAnyOf(logout.fulfilled),
  effect: (action, listenerApi) => {
    console.log("listenerMiddleware logout.fulfilled effect");
    sessionStorage.removeItem("token");
  },
});
