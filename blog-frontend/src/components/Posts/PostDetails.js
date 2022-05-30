import React, { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { fetchPostDetailsAction, updatePostAction, deletePostAction } from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import { DateFormatter } from "../../utils/DateFormatter";
import AddComment from "../Comments/AddComment";



const PostDetails = (
//props.match.params.id --> old method
) => {
    const {id}=useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch]);

  //select post details from store
  const post = useSelector(state => state?.post);

  const { postDetails, loading, appErr, serverErr , isDeleted} = post;
 // console.log(postDetails.comment); showing undefined
  //console.log(postDetails?.user?._id);
  //GET LOGIN USER_ 
  const user=useSelector(state => state?.users);
 const {userAuth:{_id}} =user;
  console.log(_id);
  //check login user is owner of the post
  const isCreatedBy= postDetails?.user?._id===_id;
  console.log(isCreatedBy);

  //REDIRECT AFTER DELETEING
  if(isDeleted) return <Navigate to="/posts"></Navigate>
  return (
    <>
      {loading ? (
        <div className="h-screen">
          <h1>Loading........</h1>
        </div>
      ) : appErr || serverErr ? (
        <h1 className="h-screen text-red-400 text-xl">
          {serverErr} {appErr}
        </h1>
      ) : (
        <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
          <div className="container px-4 mx-auto">
            {/* Post Image */}
            <img
              className="mb-24 w-full h-96 object-cover"
              src={postDetails?.image}
              alt=""
            />
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                {postDetails?.title}
              </h2>

              {/* User */}
              <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                <img
                  className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  src={postDetails?.user?.profilePhoto}
                  alt=""
                />
                <div className="text-left">
                  <h4 className="mb-1 text-2xl font-bold text-gray-50">
                    <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                      {postDetails?.user?.firstName}{" "}
                      {postDetails?.user?.lastName}{" "}
                    </span>
                  </h4>
                  <p className="text-gray-500">
                    {<DateFormatter date={post?.createdAt} />}
                  </p>
                </div>
              </div>
              {/* Post description */}
              <div className="max-w-xl mx-auto">
                <p className="mb-6 text-left  text-xl text-gray-200">
                  {postDetails?.description}

                  {/* Show delete and update button if created user(owner) only */}
                  {isCreatedBy ? <p className="flex">
                    <Link to={`/update-post/${postDetails?._id}`} className="p-3">
                      <PencilAltIcon className="h-8 mt-3 text-yellow-300" />
                    </Link>
                    <button onClick={()=>dispatch(deletePostAction(postDetails?._id))} className="ml-3">
                      <TrashIcon className="h-8 mt-3 text-red-600" />
                    </button> 
                  </p> :null}
                </p>
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
          <AddComment postId={id}/>
          <div className="flex justify-center  items-center">
            {/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
            CommentsList
          </div>
        </section>
      )}
    </>
  );
};

export default PostDetails;