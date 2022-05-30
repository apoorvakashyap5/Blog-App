import React from 'react'
import { Route,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';




export const PrivateProtectedRoute=({component: Component, ...rest})=>

  {  
      //check if user is logged in
const user=useSelector(state=>state?.users);
const {userAuth}=user;
  return(
    <Route 
    {...rest} 
    render= {()=>(userAuth?<Component {...rest}/>: <Navigate to="/login"/>)
}/>
  );

};
