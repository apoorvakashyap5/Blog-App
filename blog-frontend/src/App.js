import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Register from './components/Users/Register/Register';
import Login from './components/Users/Login/Login';
import Navbar from './components/Navigation/Navbar'
import AddNewCategory from './components/Categories/AddNewCategory'
import CategoryList from './components/Categories/CategoryList'
import { PrivateProtectedRoute } from './components/Navigation/ProtectedRoutes/PrivateProtectedRoute';
import CreatePost from './components/Posts/CreatePost';
import PostsList from './components/Posts/PostsList';
import PostDetails from './components/Posts/PostDetails';
import UpdatePost from './components/Posts/UpdatePost';
import Profile from './components/Users/Profile/Profile';


function App() {
  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>
     <Route exact path="/profile/:id" element={<Profile/>}/>
     <Route exact path='/create-post' element={<CreatePost/>}/>
       <Route exact path='/add-category' element={<AddNewCategory/>}/>
       <Route exact path='/category-list' element={<CategoryList/>}></Route>
       <Route exact path='/' element={<HomePage/>}></Route>
       <Route exact path='/register' element={<Register/>}></Route>
       <Route exact path='/login' element={<Login/>}></Route>
       <Route exact path='/posts' element={<PostsList/>}/>
       <Route exact path='/posts/:id' element={<PostDetails/>}/>
       <Route exact path='/update-post/:id' element={<UpdatePost/>}/>

   </Routes>
   </BrowserRouter>
  );
}

export default App;
