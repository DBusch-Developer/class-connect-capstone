import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./src/redux/blogSlice";
import userReducer from "./src/redux/userSlice";
import authReducer from "./src/redux/authSlice";
import { listenerMiddleware } from "./src/redux/sessionStorageMiddleware";

const preloadedState = () => {
  if (sessionStorage.getItem("token") !== null) {
    return {
      auth: {
        loading: false,
        isLoggedIn: false,
        user: {
          firstName: "",
          lastName: "",
          username: "",
          avatar: "",
          role: [],
          token: sessionStorage.getItem("token"),
        },
      },
    };
  }
  return undefined;
};

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
    users: userReducer,
  },
  preloadedState: preloadedState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});
