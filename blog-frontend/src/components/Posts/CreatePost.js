import { useFormik } from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from 'react-redux';
import { createPostAction } from "../../redux/slices/posts/postSlices";
import {Navigate} from 'react-router-dom';
//import { CategoryDropDown } from "../Categories/CategoryDropDown";



//Form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),

});


export default function CreatePost() {
  const dispatch = useDispatch();

 // //select store userData
 // const post=useSelector(state=>state.post);
 //const {isCreated, loading, appErr, serverErr}=post;
 
  
  //formik
  const formik = useFormik({
    initialValues: {
      title: "",
      category:"",
      description: ""
     
    },
    onSubmit: values => {
      console.log(values);
      //dispath the action
      dispatch(createPostAction(values));
    },
    validationSchema: formSchema,
  });
  
  //redirect to th
 // if(isCreated) return <Navigate to="/posts" />;
  
    return (
      <>
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
              Create Post
            </h2>
  
            <p className="mt-2 text-center text-sm text-gray-600">
              <p className="font-medium text-green-600 hover:text-indigo-500">
                Share your ideas to the word. Your post must be free from
                profanity
              </p>
            </p>
          
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form  onSubmit={formik.handleSubmit}className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <div className="mt-1">
                    {/* Title */}
                    <input 
                     value={formik.values.title}
                     onChange={formik.handleChange("title")}
                     onBlur={formik.handleBlur("title")}
                      id="title"
                      name="title"
                      type="title"
                      autoComplete="title"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* Err msg */}
                  <div className="text-red-500">
                    {formik.touched.title && formik.errors.title} 
                  </div>
                </div>
              {/* Category input goes here */} 
             {/* <CategoryDropDown></CategoryDropDown> */}
             <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <div className="mt-1">
                    {/* Title */}
                    <input 
                     value={formik.values.category}
                     onChange={formik.handleChange("category")}
                     onBlur={formik.handleBlur("category")}
                      id="title"
                      name="title"
                      type="title"
                      autoComplete="title"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    /><div className="text-red-500">{formik.touched.category && formik.errors.category}</div>  
                  </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  {/* Description */}
                  <textarea
                   value={formik.values.description}
                   onChange={formik.handleChange("description")}
                   onBlur={formik.handleBlur("description")}
                    rows="5"
                    cols="10"
                    className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                    type="text"
                  ></textarea>
                 
                  <div className="text-red-500"> {formik?.touched?.description}</div>
                </div>
                <div>
                  {/* Submit btn */}
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
  