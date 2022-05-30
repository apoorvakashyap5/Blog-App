import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseurl";


//create comment 



//action
export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (comment, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axios.post(`${baseUrl}/api/comments`, {
        description: comment?.description,
        postId: comment?.postId,
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

//handle slices

const commentSlices=createSlice({
    name: 'comment',
    initialState:{},
    extraReducers:builder=>{
        builder.addCase(createCommentAction.pending, (state, action)=>{
            state.loading=true;
        });
        builder.addCase(createCommentAction.fulfilled, (state, action)=>{
            state.loading=false;
            state.commentCreated=action?.payload;
            state.appErr=undefined;
            state.serverErr=undefined;
        });
        builder.addCase(createCommentAction.rejected, (state, action)=>{
            state.loading=false;
            state.commentCreated=undefined;
            state.appErr=action?.payload?.message;
            state.serverErr=action?.error?.message;
        });
    },
});

export default commentSlices.reducers;