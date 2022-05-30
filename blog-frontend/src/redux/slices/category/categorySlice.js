import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseurl";


//action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.post(`${baseUrl}/api/category`, {
        title: category?.title,
      },
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

//---------------------------------------------------------------------------
//action of fetching categories
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch",
  async (category, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    console.log(userAuth?.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/category`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slices

const categorySlices = createSlice({
  name: "category",
  initialState: { },
  extraReducers: builder => {
    //create===================================================================
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetchALLcategories==========================================================================
    builder.addCase(fetchCategoriesAction.pending, (state, action)=>{
      state.loading=true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action)=>{
    state.categoryList=action?.payload;
    state.loading=false;
    state.appErr=undefined;
    state.serverErr=undefined;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state,action)=>{
      state.loading=false;
      state.appErr=action?.payload?.message;
      state.serverErr=action?.error?.message;
    });
  },
});

export default categorySlices.reducer;
