import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {useSelector, useDispatch} from "react-redux"
import { updateBlog, getBlog } from "../redux/blogSlice"



const UpdateBlog = () => {
  const { blogId } = useParams();
  const {blog} = useSelector((state) => state.blog)

  const [blogForm, setBlogForm] = useState({
    id: "",
    author: "",
    authorTitle: "",
    profilePhoto: "",
    category: "",
    readTime: "",
    title: "",
    body: "",
    coverPhoto: "",
    date: new Date(),
    comment: ""
  });

  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(() => {
 if (id) {
  dispatch(getBlog(id))
 }
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();


   dispatch(updateBlog({id, blog: blogForm}))
  };

  const [showAreYouSure, setShowAreYouSure] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const showModal = () => {
    setShowAreYouSure(true);
  };

  // const handleDelete = async () => {
  //   const deleteBlog = await axios.delete(
  //     `${import.meta.env.VITE_NODE_SERVER}/blog/${blogId}`
  //   );
  //   if (deleteBlog.data.success === true) {
  //     setBlogs(blogs.filter((blog) => blog.id !== blogForm.id));
  //     setShowAreYouSure(false);
  //     navigate("/");
  // //   }
  // };

  return (
    <>
      <div>
        {showSuccess && (
          <div
            className="show-success flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Success!</span> Your blog was
              created!
            </div>
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
              data-dismiss-target="#alert-3"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div>
        {showAreYouSure && (
          <div className="">
            <div
              id="popup-modal"
              tabIndex="-1"
              className="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div className="modal relative p-4 w-full max-w-md max-h-full">
                <div className="relative rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAreYouSure(false);
                    }}
                    className="modal-button absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="background p-4 md:p-5 text-center">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this product?
                    </h3>
                    <button
                      onClick={handleDelete}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="modal-button text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={() => {
                        setShowAreYouSure(false);
                      }}
                      className="modal-button2 py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="blog-bg  py-5 px-10 mx-auto mt-10 mb-10 max-w-2xl lg:py-16 shadow">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update your blog post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="blog-post-title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Blog Post Title
              </label>
              <input
                value={blogForm.title}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, title: e.target.value })
                }
                disabled = {true}
                type="text"
                name="blog-post-title"
                id="blog-post-title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type article heading here..."
                required=""
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="author-name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Author Name
              </label>
              <input
                value={blogForm.author}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, author: e.target.value })
                }
                disabled = {true}
                type="text"
                name="author-name"
                id="author-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your name"
                required=""
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="author-title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Author Title
              </label>
              <input
                value={blogForm.authorTitle}
                onChange={(e) =>
                  setBlogForm({
                    ...blogForm,
                    authorTitle: e.target.value,
                  })
                }
                disabled = {true}
                type="text"
                name="author-title"
                id="author-title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your Title"
                required=""
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Profile Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <svg
                  className="h-12 w-12 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>

                {/* <input
                  className=" block w-full text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 dark:text-gray-400  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="user_avatar_help"
                  id="user_avatar"
                  type="text"
                  value={blogForm.profilePhoto}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, profilePhoto: e.target.value })
                  }
                /> */}
                <input className="profile-photo  rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" type="file" id="myFile" name="filename"
                onChange={(e) =>
                  setBlogForm({ ...blogForm, profilePhoto: e.target.value })
                }
                disabled = {true}  
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-15 font-medium text-[#6ecfd5]"
              >
                Category
              </label>
              <select
                value={blogForm.category}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, category: e.target.value })
                }
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400  dark:focus:ring-gray-500 dark:focus:border-gray-500"
              >
                <option defaultValue="">Select category</option>
                <option value="React">React</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Tailwind">Tailwind</option>
                <option value="React Bits">React Bits</option>
                <option value="Bootstrap">Bootstrap</option>
                <option value="ReduxToolkit">Redux Toolkit</option>
                <option value="TypeScript">TypeScript</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="SQL">SQL</option>
                <option value=" AngularJS/ReactJS/Vue.js">
                  AngularJS/ReactJS/Vue.js
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="read-time"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Read Time (min)
              </label>
              <input
                value={blogForm.readTime}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, readTime: e.target.value })
                }
                disabled = {true}
                type="number"
                name="read-time"
                id="read-time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0"
                required=""
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Article
              </label>
              <textarea
                value={blogForm.body}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, body: e.target.value })
                }
                disabled = {true}
                id="description"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your article here.."
              ></textarea>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Cover photo
            </label>
            <div className="img-upload mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="mt-4 flex justify-center text-sm/6 text-gray-600 text-center">
                  <label
                    htmlFor="file-upload"
                    className="upload-btn flex rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600  hover:text-indigo-500"
                  >
                    <span className="cursor-pointer justify-center">Upload a file</span>
                  </label>
                </div>
                {/* <input
                  value={blogForm.coverPhoto}
                  id="file-upload"
                  name="file-upload"
                  type="text"
                  // className="sr-only"
                  className="rounded-md"
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, coverPhoto: e.target.value })
                  }
                /> */}
                 <input
                  // value={blogForm.coverPhoto}
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, coverPhoto: e.target.value })
                  }
                  disabled = {true}
                />
                <p className="text-xs/5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>

                
              </div>
              <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
               Comment
              </label>
              <textarea
                value={blogForm.comment}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, comment: e.target.value })
                }
                id="description"
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your article here.."
              ></textarea>
            </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg  dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Save
            </button>
            <button
              className="flex justify-end px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white  rounded-lg "
              type="button"
              onClick={showModal}
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                navigate(`/blog/${blogId}`);
              }}
              className="flex justify-end px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white  rounded-lg "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateBlog;
