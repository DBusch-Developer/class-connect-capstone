import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./src/redux/blogSlice"

export const store = configureStore({
    reducer: {
        blog: blogReducer
    }
})