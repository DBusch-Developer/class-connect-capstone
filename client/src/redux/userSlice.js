import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userService from "./userService"

const initialState = {
  loading: false,
  user: {
    avatar: "",
    firstName: "",
    lastName: "",
    username: "",
    role: [],
    token: "",
    id: ""
  },
  users: []
}

//User Get Many
export const userGetMany = createAsyncThunk("user/getMany", async () => {
  const response = await userService.userList()
  console.log(response)
  return response.data
})

// User Get All
export const userGetAll = createAsyncThunk("user/getAll", async () => {
  const response = await userService.userGetAll()
  return response.data
})


// User Create
export const userCreate = createAsyncThunk("user/create", async (userForm) => {
  const response = await userService.userCreate(userForm)
  return response.data
})

//User Get One
export const userGetOne = createAsyncThunk("user/getOne", async (username) => {
  console.log("thunk username", username)
  const response = await userService.userGetOne(username)
  console.log(response)
  return response.data
})

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get list of users
      .addCase(userGetMany.pending, (state, action) => {
        state.loading = true
      })
      .addCase(userGetMany.fulfilled, (state, action) => {
        console.log("userSlice userGetMany.fulfilled", action.payload)
        state.loading = false
        state.isLoggedIn = true
        state.users = action.payload.users
      })
      .addCase(userGetMany.rejected, (state, action) => {
        console.log("userSlice userGetMany.rejected", action.payload)
        state.loading = false
      })

      // User Get All
      .addCase(userGetAll.pending, (state, action) => {
        state.loading = true
      })
      .addCase(userGetAll.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.users
      })
      .addCase(userGetAll.rejected, (state, action) => {
        console.log("userSlice userGetAll.rejected", action.payload)
        state.loading = false
      })

      // User Create
      .addCase(userCreate.pending, (state, action) => {
        console.log("userSlice userCreate.pending", action.payload)
        state.loading = true
      })
      .addCase(userCreate.fulfilled, (state, action) => {
        console.log("userSlice userCreate.fulfilled", action.payload)
        state.loading = false
        state.users = action.payload.users
      })
      .addCase(userCreate.rejected, (state, action) => {
        console.log("userSlice userCreate.rejected", action.payload)
        state.loading = false
      })

      // User Get One
      .addCase(userGetOne.pending, (state, action) => {
        console.log("userSlice userGetOne.pending", action.payload)
        state.loading = true
      })
      .addCase(userGetOne.fulfilled, (state, action) => {
        console.log("userSlice userGetOne.fulfilled", action.payload)
        state.loading = false
        state.user = action.payload
      })
      .addCase(userGetOne.rejected, (state, action) => {
        console.log("userSlice userGetOne.rejected", action.payload)
        state.loading = false
      })
  }
})

export default userSlice.reducer
