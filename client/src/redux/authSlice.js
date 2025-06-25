import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: {
    avatar: "",
    firstName: "",
    lastName: "",
    username: "",
    role: [],
    token: ""
  },
  authUser: {
    avatar: "",
    firstName: "",
    lastName: "",
    username: "",
    role: [],
    token: ""
  }
}

export const authLogin = createAsyncThunk("auth/login", async (credentials) => {
  const { username, password } = credentials
  const response = await authService.authLogin(username, password)
  // console.log(response)
  return response.data
})

export const checkLogin = createAsyncThunk("auth/checkLogin", async (token) => {
  const response = await authService.checkLogin(token)
  // console.log(response)
  return response.data
})

export const logout = createAsyncThunk("auth/logout", async (token) => {
  const response = await authService.logout(token)
  // console.log(response)
  return response.data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Login
      .addCase(authLogin.pending, (state, action) => {
        state.loading = true
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        // state.authUser = { ...action.payload.user }
        // console.log(action.payload)
        state.loading = false
        state.isLoggedIn = true
        state.user = { ...action.payload.user }
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false
      })

      // Check login
      .addCase(checkLogin.pending, (state, action) => {
        state.loading = true
      })
      .addCase(checkLogin.fulfilled, (state, action) => {
        // console.log("authSlice checkLogin fulfilled", action.payload)
        state.loading = false
        state.isLoggedIn = true
        state.user = { ...action.payload.user }
         state.authUser = { ...action.payload.user }
      })
      .addCase(checkLogin.rejected, (state, action) => {
        state.loading = false
      })

      // Logout
      .addCase(logout.pending, (state, action) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        // console.log("authSlice logout fulfilled", action.payload)
        sessionStorage.removeItem("token")
        state.loading = false
        state.isLoggedIn = false
        state.user = { firstName: "", lastName: "", username: "", role: [], token: "" }
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
      })
  }
})

export default authSlice.reducer
