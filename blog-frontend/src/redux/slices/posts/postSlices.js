import {createAsyncThunk, createSlice , createAction} from '@reduxjs/toolkit'
import axios from 'axios';
import { baseUrl } from "../../../utils/baseurl";


//reset/
//const resetPost=createAction("category/reset");
//create post action 
export const createPostAction= createAsyncThunk('post/created',
 async (post, { rejectWithValue, getState, dispatch})=>{
// const details=localStorage.getItem('userInfo');

 //getuser token to be able to create post
 const user=getState()?.users;
 post.user=user.userAuth._id;
  console.log(user)
 const {userAuth}=user;
  console.log(userAuth?.token); // got token in console. now pass it as header
 const config={
   headers: {
     Authorization:`Bearer ${userAuth?.token}`,
   },
 };

 try{
     //const formData= new FormData();
     //formData.append("title",post?.title);
     //formData.append("description", post?.description);
     //formData.append("category", post?.category);
     //formData.append("image", post?.image);
     //passss formData instead of post
    // console.log(post);
     //http call
     const {data}= await axios.post(`${baseUrl}/api/posts`, post, config);
     //dispatch action, config
    // dispatch(resetPost);
     return data;
 } catch(error){
     if(!error?.resposne) throw error;
    return rejectWithValue(error?.resposne?.message);
 } 

});
//--------------------------------------------------------------------
//update post action 
export const updatePostAction= createAsyncThunk('post/updated',
 async (post, { rejectWithValue, getState, dispatch})=>{
// const details=localStorage.getItem('userInfo');

 //getuser token to be able to create post
 const user=getState()?.users;
 post.user=user.userAuth._id;
  console.log(user)
 const {userAuth}=user;
  console.log(userAuth?.token); // got token in console. now pass it as header
 const config={
   headers: {
     Authorization:`Bearer ${userAuth?.token}`,
   },
 };

 try{
    
     //console.log(post);
     //http call
     //post contains data to be updated
     const {data}= await axios.put(`${baseUrl}/api/posts/${post?.id}`, post, config);
    
     return data;
 } catch(error){
     if(!error?.resposne) throw error;
    return rejectWithValue(error?.resposne?.message);
 } 

});
//====================================================
//delete posts
export const deletePostAction= createAsyncThunk('post/deleted',
 async (postId, { rejectWithValue, getState, dispatch})=>{
// const details=localStorage.getItem('userInfo');

 //getuser token to be able to create post
 const user=getState()?.users;
 //post.user=user.userAuth._id;
  console.log(user)
 const {userAuth}=user;
  console.log(userAuth?.token); // got token in console. now pass it as header
 const config={
   headers: {
     Authorization:`Bearer ${userAuth?.token}`,
   },
 };

 try{
     //http call
     const {data}= await axios.delete(`${baseUrl}/api/posts/${postId}`, config);
     //dispatch action, config
    // dispatch(resetPost);
     return data;
 } catch(error){
     if(!error?.resposne) throw error;
    return rejectWithValue(error?.resposne?.message);
 } 

});

//================================================================================
//fetchPosts
export const fetchPostsAction= createAsyncThunk('post/list',
 async (category, { rejectWithValue, getState, dispatch})=>{
// no authentication req, anyone can fetch posts
 try{
     //console.log(post);
     //http call
     const {data}= await axios.get(`${baseUrl}/api/posts?category=${category}`);
     //dispatch action, config
    // dispatch(resetPost);
     return data;
 } catch(error){
     if(!error?.resposne) throw error;
    return rejectWithValue(error?.resposne?.data);
 } 

});


//================================================================================
//fetchPosts
//fetchPostsDetails

export const fetchPostDetailsAction= createAsyncThunk('post/detail',
 async (id, { rejectWithValue, getState, dispatch})=>{
// no authentication req, anyone can fetch posts

 try{
     //console.log(post);
     //http call
     const {data}= await axios.get(`${baseUrl}/api/posts/${id}`);
     return data;
 } catch(error){
     if(!error?.resposne) throw error;
    return rejectWithValue(error?.resposne?.data);
 } 

});


//-============================================================
//Add likes to post 
export const toggleAddLikesToPost = createAsyncThunk('post/like', async (postId,{ rejectWithValue, getState, dispatch}) => {
     //getuser token to be able to like post
 const user=getState()?.users;
 //post.user=user.userAuth._id;
 // console.log(user)
 const {userAuth}=user;
  console.log(userAuth?.token); // got token in console. now pass it as header
 const config={
   headers: {
     Authorization:`Bearer ${userAuth?.token}`,
   },
 };
 try{
     const {data} = await axios.put(`${baseUrl}/api/posts/likes/}`, {postId},config);
     return data;
    }catch(error){
        if(!error?.resposne){
            throw error;
        } return rejectWithValue(error?.resposne?.data);
    }

});
//===========================================================================
//dislike a post

export const toggleAddDisLikesToPost = createAsyncThunk('post/dislike', async (postId,{ rejectWithValue, getState, dispatch}) => {
    //getuser token to be able to like post
const user=getState()?.users;
//post.user=user.userAuth._id;
// console.log(user)
const {userAuth}=user;
 console.log(userAuth?.token); // got token in console. now pass it as header
const config={
  headers: {
    Authorization:`Bearer ${userAuth?.token}`,
  },
};
try{
    const {data} = await axios.put(`${baseUrl}/api/posts/dislikes/}`, {postId},config);
    return data;
   }catch(error){
       if(!error?.resposne){
           throw error;
       } return rejectWithValue(error?.resposne?.data);
    } }
);



//==================================================================================
//slice
const postSlice= createSlice({
    name:'post',
    initialState:{},
    extraReducers:builder=>{
        //create post
builder.addCase(createPostAction.pending, (state, action)=>{
    state.loading=true;
});
//builder.addCase(resetPost,(state,action)=>{
//    state.isCreated=true;
//});
builder.addCase(createPostAction.fulfilled, (state, action)=>{
    state.loading=false;
    state.postCreated=action?.payload;
  //  state.isCreated=false;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(createPostAction.rejected, (state, action)=>{
    state.loading=false;
    state.appErr=action?.payload?.message;
    state.serverErr=action?.error?.message;
});

//update posts
builder.addCase(updatePostAction.pending, (state, action)=>{
    state.loading=true;
});

builder.addCase(updatePostAction.fulfilled, (state, action)=>{
    state.loading=false;
    state.postUpdated=action?.payload;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(updatePostAction.rejected, (state, action)=>{
    state.loading=false;
    state.appErr=action?.payload?.message;
    state.serverErr=action?.error?.message;
});

//delete post request//update posts
builder.addCase(deletePostAction.pending, (state, action)=>{
    state.loading=true;
});

builder.addCase(deletePostAction.fulfilled, (state, action)=>{
    state.loading=false;
    state.postDeleted=action?.payload;
    state.isDeleted=true;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(deletePostAction.rejected, (state, action)=>{
    state.loading=false;
    state.appErr=action?.payload?.message;
    state.serverErr=action?.error?.message;
});


//fetch post 
builder.addCase(fetchPostsAction.pending, (state, action)=>{
    state.loading=true;
});
builder.addCase(fetchPostsAction.fulfilled, (state, action)=>{
    state.loading=false;
    state.postLists=action?.payload;
  //  state.isCreated=false;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(fetchPostsAction.rejected, (state, action)=>{
    state.loading=false;
    state.appErr=action?.payload?.message;
    state.serverErr=action?.error?.message;
});
//post deatails fetch
builder.addCase(fetchPostDetailsAction.pending, (state, action)=>{
    state.loading=true;
});
builder.addCase(fetchPostDetailsAction.fulfilled, (state, action)=>{
    state.loading=false;
    state.postDetails=action?.payload;
  //  state.isCreated=false;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(fetchPostDetailsAction.rejected, (state, action)=>{
    state.loading=false;
    state.appErr=action?.payload?.message;
    state.serverErr=action?.error?.message;
});

//like post 
builder.addCase(toggleAddLikesToPost.pending, (state, action)=>{
    state.loading=true;
});
builder.addCase(toggleAddLikesToPost.fulfilled, (state, action)=>{
    state.loading=false;
    state.likes=action?.payload;
    state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(toggleAddLikesToPost.rejected, (state, action)=>{
    state.loading=false;
    state.appErr=action?.payload?.message;
    state.serverErr=action?.error?.message;
});

//dislike post 
builder.addCase(toggleAddDisLikesToPost.pending, (state, action)=>{
    state.loading=true;
});
builder.addCase(toggleAddDisLikesToPost.fulfilled, (state, action)=>{
    state.loading=false;
    state.dislikes=action?.payload;
      state.appErr=undefined;
    state.serverErr=undefined;
});
builder.addCase(toggleAddDisLikesToPost.rejected, (state, action)=>{
    state.loading=false;
    state.appErr=action?.payload?.message;
    state.serverErr=action?.error?.message;
});
    },
});

export default postSlice.reducer;