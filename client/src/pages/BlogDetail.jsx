import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  getBlog,
  blogCommentCreate,
  blogCommentDelete,
} from "../redux/blogSlice";
import Markdown from "react-markdown";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { blog } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const isLoggedInUser = user && user.username ? true : false;
  console.log("user", user);
  const loggedInUser = user.username;
  console.log("loggedInUser", loggedInUser);
  const loggedInUserPhoto = user.avatar;
  console.log("loggedInUserPhoto", loggedInUserPhoto);

  useEffect(() => {
    dispatch(getBlog(id));
    window.scrollTo(0, 0);
  }, []);

  // So I can add comments to posts
  const [addComment, setAddComment] = useState({
    username: loggedInUser,
    profilePhoto: loggedInUserPhoto,
    comment: "",
    timeStamp: new Date(),
  });

  console.log("addComment", addComment);

  // Add comment function for blog posts
  const handleAddComment = async (e) => {
    e.preventDefault();
    setAddComment({
      ...addComment,
      username: loggedInUser,
    });
    dispatch(blogCommentCreate({ id, addComment }));
    setAddComment({
      ...addComment,
      comment: "",
      timeStamp: new Date(),
    });
  };

  // Delete comment function for blog posts
  const handleDeleteComment = (comment) => {
    dispatch(blogCommentDelete({ blogId: id, commentId: comment._id }));
  };

  return (
    <>
      <div className="p-30 flex flex-col m-auto  w-1/2">
        <Link className="" to={blog.isArchived ? "/archived" : "/blog-list"}>
          <button className="mb-10 numans inline-flex items-center px-5 py-2.5 mt-4 text-md font-med text-center  black  rounded-lg text-black font-bold bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc]  rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="self-center bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>{" "}
            Go Back
          </button>
        </Link>

        <img className="rounded-md h-50%" src={`${blog.coverPhoto}`} />
        <div className="text-white text-4xl mt-10 font-bold"> {blog.title}</div>
        <div className="flex flex-row items-center mt-10 mb-none gap-x-4 max-h-20 mb-5">
          <div>
            <img
              className="rounded-full size-12"
              src={`${blog.profilePhoto}`}
            />
          </div>
          <div className="">
            <p className="font-semibold text-md text-white ">{blog.author}</p>
          </div>
          <div>
            <p className="font-semibold text-md text-white">
              {new Date(blog.date).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <a
              href="#"
              className="relative z-10 rounded-full px-3 py-1.5 font-medium text-white "
            >
              #{blog.category}
            </a>
          </div>
          <div>
            <span className="flex items-end text-white">
              {blog.readTime} min read
            </span>
          </div>
        </div>
        <p className="text-white text-lg">
          <Markdown>{blog.body}</Markdown>
        </p>

        {/* Comment Section */}
        {isLoggedInUser && blog.isArchived !== true && (
          <div className="pt-8 w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-lg lg:text-xl font-bold text-neutral-300 numans mt-8 mb-3">
                Your Feedback Matters...
              </h2>
            </div>
            {/* Add a comment */}
            <form onSubmit={handleAddComment} className="mb-6">
              <div className="py-2 px-4 mb-4 bg-black rounded-lg rounded-t-lg border border-gray-200 w-full">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  value={addComment.comment}
                  onChange={(e) =>
                    setAddComment({ ...addComment, comment: e.target.value })
                  }
                  id="comment"
                  rows="6"
                  className="w-full text-sm text-neutral-200 border-0 focus:ring-0"
                  placeholder="Leave a reply..."
                  required
                ></textarea>
              </div>
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="text-black font-bold bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc] rounded-lg text-sm px-4 py-2 text-center numans cursor-pointer"
                >
                  Post comment
                </button>
              </div>
            </form>
          </div>
        )}
        {/* Show all comments */}
        <div className="mt-10">
          <h2 className="numans text-white text-xl border-t-2 pt-5 font-bold">
            Comments
          </h2>
        </div>
        {blog.comments.map((comment, index) => (
          <div className="flex flex-col mt-10" key={index}>
            <div className="inline-flex justify-between items-center">
              <div className="inline-flex justify-between items-center gap-x-4">
                {blog.profilePhoto ? (
                  <img
                    className="rounded-full border-white w-7 h-7"
                    src={`${user.avatar}`}
                  />
                ) : (
                  <div className="text-white text-xs">No Avatar</div>
                )}

                <div className="text-neutral-200">{comment.username}</div>
                <div>
                  <time className=" text-white">
                    {new Date(comment.timeStamp).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </time>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mt-2">
              <div className="text-neutral-200 ml-10">{comment.comment}</div>
              {/* Delete button only for the logged-in user */}
              {comment.username === loggedInUser && (
                <div className="text-neutral-200">
                  <button
                    onClick={() => handleDeleteComment(comment)}
                    className="text-black bg-[#6ecfd5] text-xs font-bold numans cursor-pointer p-2 rounded-lg ml-12 focus:ring-4 focus:outline-none focus:ring-[#60c7cc]"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogDetail;
