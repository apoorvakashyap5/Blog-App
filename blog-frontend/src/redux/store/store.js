import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlices";
import categoriesReducer from "../slices/category/categorySlice";
import post from "../slices/posts/postSlices"
import comment from "../slices/comments/commentSlices";


const store = configureStore({
  reducer: {
    users: userReducer,
    category:categoriesReducer,
    post,
    comment,
  },
});

export default store;
