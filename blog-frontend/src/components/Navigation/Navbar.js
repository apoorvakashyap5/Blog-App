import React from "react";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import {useSelector} from 'react-redux';

const Navbar = () => {
  //get user from store
  const state=useSelector(state=>state.users);
  const {userAuth}=state;
  const isAdmin=userAuth?.isAdmin;
  
  return (
    <>
   {isAdmin? <AdminNavbar/>: userAuth?<PrivateNavbar/> :<PublicNavbar/>}
    </>
  );
};

export default Navbar;
