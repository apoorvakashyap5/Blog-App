import React from 'react'
import Select from 'react-select';
import useEffect from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { fetchCategoriesAction } from '../../redux/slices/category/categorySlice';


const options = [
    { value: 'tech', label: 'Chocolate' },
    { value: 'All', label: 'Strawberry' },
    { value: 'life', label: 'Vanilla' },
    ];
  
 

  export const CategoryDropDown = () => {
    //dispatch action
    const dispatch =useDispatch();
    useEffect(()=>{
        dispatch(fetchCategoriesAction());
    }, [dispatch]);
    //select categories
   const category= useSelector(state=>state?.category);
   console.log(category);
  return <Select options={options}/>;
}
 