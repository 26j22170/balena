import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//register 
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/registerUser`, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.msg);
    }
  }
);
//login
export const login = createAsyncThunk(
  "users/login",
  async(userData,thunkAPI) => {
    try{
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, userData);
      localStorage.setItem("userId", response.data.user._id);
      const user = response.data.user;
      const msg = response.data.msg;
      const isAdmin = response.data.isAdmin;
      return{user,msg, isAdmin};
    }
    catch(error){
      console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data?.msg);

}});

const initialState = {
  user: null,
  status: null,
  msg: "",
  isLogin: false,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "rejected";
        state.msg = action.payload ;
      })
      //add case for login
      .addCase(login.pending,(state)=>{
        state.status = "loading";
   })
      .addCase(login.fulfilled,(state,action)=>{
        state.status = "success";
        state.isLogin = true;
        state.user = action.payload.user;
        state.msg = action.payload.msg;
        state.isAdmin = action.payload.isAdmin;
   })
      .addCase(login.rejected,(state,action)=>{
        state.status = "rejected";
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload.msg;

   });
  },
});

export default userSlice.reducer;
