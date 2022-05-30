import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseurl";
//--------------------------------------------------------------------------------------------------------
//register action : 
//thunk created
export const registerUserAction = createAsyncThunk(
  "users/register", //action type
  async (user, { rejectWithValue, getState, dispatch }) => {
    //user is the payload
      //rejectedwithValue-- helps us give exact error to the user
      //getState---- gives us a snapshot of what is in our entire state
      //dispatch-----helps dispatch another action inside this action
    try {
      //http call
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
          //api end-point
        `${baseUrl}/api/users/register`,
        //payload:things we need to be able to register a user
        user,
        //config
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------------------------------------------------------------------------
//login----------------------------------
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      //make http call
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userData,
        config
      );
      //save user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//-------------------------------------------------------------
//user profile
export const userProfileAction = createAsyncThunk(
  "user/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //getuser token to be able to create post
    const user=getState()?.users;
   // console.log(user)
   const {userAuth}=user;
   // console.log(userAuth?.token); // got token in console. now pass it as header
   const config={
     headers: {
       Authorization:`Bearer ${userAuth?.token}`,
     },
   };
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/users/profile/${id}`, 
      config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//--------------------------------------------------------------------------
//follow
export const followUserAction = createAsyncThunk(
  "user/follow",
  async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
    //getuser token to be able to create post
    const user=getState()?.users;
   // console.log(user)
   const {userAuth}=user;
   // console.log(userAuth?.token); // got token in console. now pass it as header
   const config={
     headers: {
       Authorization:`Bearer ${userAuth?.token}`,
     },
   };
    //http call
    try {
      const { data } = await axios.put(`${baseUrl}/api/users/follow`, {followId:userToFollowId},
      config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//================================================================
//LOGOUT action
export const logoutAction=createAsyncThunk(
  'user/logout',
  async (payload, { rejectWithValue, getState, dispatch}) => {
    try{
     localStorage.removeItem('userInfo')
    }
    catch(error){
      if(!error?.response){
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//=================================================================
//get user from localStorage and provide to initialState
const userLoginFromStorage =localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null;

//------------------------------------------------------------------------------------------------------------------------
//register
//createslices gives reducers and actionCreators both

const usersSlices = createSlice({
    name: "users",
    //reducer needs a state
    initialState: {
      userAuth: userLoginFromStorage,

    },
    //object notation
    extraReducers: (builder) => {
      //register
    
      builder.addCase(registerUserAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(registerUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.registered = action?.payload;
        state.appErr = undefined; //since successful
        state.serverErr = undefined;
      });
      builder.addCase(registerUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message; //sice failed
        state.serverErr = action?.error?.message;
      });

      //----------------------===========================------------------------------------
      //login slices
      builder.addCase(loginUserAction.pending, (state, action) => {
        state.loading=true;
        state.appErr=undefined;
        state.serverErr=undefined;
      });
      builder.addCase(loginUserAction.fulfilled, (state, action) => {
        state.userAuth=action?.payload;
        state.loading=false;
        state.appErr=undefined;
        state.serverErr=undefined;
      });
      builder.addCase(loginUserAction.rejected,(state, action)=>{
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
        state.loading=false;
      });
      //---------------------------------------------------------------------
      //userprofile
      builder.addCase(userProfileAction.pending, (state, action) => {
        state.profileLoading=true;
        state.profileAppErr=undefined;
         state.profileServerErr=undefined;
      });
      builder.addCase(userProfileAction.fulfilled, (state, action) => {
        state.profile=action?.payload;
        state.profileLoading=false;
        state.profileAppErr=undefined;
        state.profileServerErr=undefined;
      });
      builder.addCase(userProfileAction.rejected,(state, action)=>{
        state.profileAppErr=action?.payload?.message;
        state.profileServerErr=action?.error?.message;
        state.profileLoading=false;
      });
      //-----------------------------------------------------------------
      //follow

       builder.addCase(followUserAction.pending, (state, action) => {
        state.loading=true;
        state.appErr=undefined;
        state.serverErr=undefined;
      });
      builder.addCase(followUserAction.fulfilled, (state, action) => {
        state.follow=action?.payload;
        state.loading=false;
        state.appErr=undefined;
        state.serverErr=undefined;
      });
      builder.addCase(followUserAction.rejected,(state, action)=>{
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
        state.loading=false;
      });

      //-------------------------------------------============================
       //logout slices
       builder.addCase(logoutAction.pending, (state, action)=>{
        state.loading=false;
      });
      builder.addCase(logoutAction.fulfilled, (state, action)=>{
        state.userAuth=undefined;
        state.loading=false;
        state.appErr=undefined;
        state.serverErr=undefined;
      });
      builder.addCase(logoutAction.rejected, (state, action)=>{
        state.loading=false;
        state.appErr=action?.payload?.message;
        state.serverErr=action?.error?.message;
      });
    },
  });
  
  export default usersSlices.reducer;
  

  //for createAsyncThunk any action you create it gives:
  //1. pending
  //2.fulfilled
  //3.rejected
