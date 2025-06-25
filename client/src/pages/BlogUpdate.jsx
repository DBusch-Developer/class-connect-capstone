import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateBlog, getBlog } from "../redux/blogSlice";
import { userGetOne } from "../redux/userSlice";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { blog } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);

  const [blogForm, setBlogForm] = useState({
    id: "",
    author: "",
    profilePhoto: "",
    category: "",
    readTime: "",
    title: "",
    body: "",
    coverPhoto: "",
    date: new Date(),
    comment: "",
    isPublished: "",
    isArchived: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);

    // Fetch blog when id changes
  useEffect(() => {
    dispatch(getBlog(id));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  // Reset form when blog changes
  useEffect(() => {
    if (blog && blog.id === id) {
      setBlogForm({
        ...blog,
        // ensure booleans if needed
        isPublished: !!blog.isPublished,
        isArchived: !!blog.isArchived,
      });
    }
  }, [blog, id]);

  useEffect(() => {
    console.log("blogForm", blogForm);
  }, [blogForm]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleCoverPhotoUpload = async (e) => {
    console.log("handleFile", e);
    if (e.target.files) {
      const testString64 = await toBase64(e.target.files[0]);
      setBlogForm({ ...blogForm, coverPhoto: testString64 });
      console.log(testString64);
      setAvatarFile(e.target.files[0]); // Store the file for potential future use
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBlogForm({
      author: blogForm.author,
      profilePhoto: blogForm.profilePhoto,
      category: blogForm.category,
      readTime: blogForm.readTime,
      title: blogForm.title,
      body: blogForm.body,
      coverPhoto: blogForm.coverPhoto,
      date: new Date(),
      isPublished: blogForm.isPublished,
      isArchived: blogForm.isArchived,
    });
    const updatedBlog = {
      ...blogForm,
      isPublished: user.role.includes("Admin") ? blogForm.isPublished : false,
    };
    dispatch(updateBlog({ id, blog: updatedBlog }));
    navigate(`/blog/${id}`);
  };

  return (
    <>
      <div className="blog-bg py-5 px-10 mx-auto mt-10 mb-10 max-w-2xl lg:py-16 shadow rubik text-[#6ecfd5]">
        <h2 className="pt-10 pb-7 flex numans mb-4 text-3xl font-med ">
          Update your blog post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-15 font-medium text-[#6ecfd5] "
              >
                Blog Post Title
              </label>

              <input
                value={blogForm.title}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, title: e.target.value })
                }
                type="text"
                name="title"
                id="title"
                className=" bg-neutral-300 border border-gray-300 text-black placeholder:text-gray-500 text-15 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Type article heading here..."
                required="required"
              />
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
                className="bg-neutral-300 border border-gray-300 text-black placeholder:text-gray-500  text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-400  dark:focus:ring-gray-500 dark:focus:border-gray-500"
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
                <option value="AI">AI</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="read-time"
                className="block mb-2 text-15 font-medium text-[#6ecfd5]"
              >
                Read Time (min)
              </label>
              <input
                value={blogForm.readTime}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, readTime: e.target.value })
                }
                type="number"
                name="read-time"
                id="read-time"
                className="bg-neutral-300 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-600 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="1"
                required=""
                min="1"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-15 font-medium text-[#6ecfd5]"
              >
                Article
              </label>
              <textarea
                value={blogForm.body}
                onChange={(e) =>
                  setBlogForm({ ...blogForm, body: e.target.value })
                }
                id="description"
                rows="8"
                className="bg-neutral-300 placeholder:text-gray-500 border border-gray-300 text-black text-15 rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500 mb-5"
                placeholder="Type your article here..."
              ></textarea>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-15 font-medium text-[#6ecfd5]"
            >
              Cover Photo
            </label>
            <div className="img-upload mt-2 flex justify-center rounded-lg border border-dashed border-white-900/25 px-6 py-10">
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
                    <span className="cursor-pointer text-white justify-center bg-black">
                      Upload a file
                    </span>
                  </label>
                </div>

                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only bg-black"
                  onChange={handleCoverPhotoUpload}
                />
                <p className="text-xs/5 font-med black ">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-6">
            <fieldset>
              <div class="mt-6 flex justify-between gap-6">
                {user.role.includes("Admin") && (
                  <div class="flex gap-3">
                    <div class="flex h-6 shrink-0 items-center">
                      <div class="group grid size-4 grid-cols-1">
                        <input
                          id="publish"
                          aria-describedby="publish-description"
                          name="publish"
                          type="checkbox"
                          checked={!!blogForm.isPublished}
                          onChange={(e) =>
                            setBlogForm({
                              ...blogForm,
                              isPublished: e.target.checked,
                            })
                          }
                          class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-[#6ecfd5] checked:bg-[#6ecfd5]  focus-visible:outline-2 focus-visible:outline-offset-2 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            class="opacity-0 group-has-checked:opacity-100"
                            d="M3 8L6 11L11 3.5"
                            stroke="#000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            class="opacity-0 group-has-indeterminate:opacity-100"
                            d="M3 7H11"
                            stroke="#000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="text-sm/6">
                      <label for="publish" class="font-medium text-[#6ecfd5]">
                        Publish
                      </label>
                    </div>
                  </div>
                )}
                <div class="flex gap-3">
                  <div class="flex h-6 shrink-0 items-center">
                    <div class="group grid size-4 grid-cols-1">
                      <input
                        id="archive"
                        aria-describedby="archive"
                        name="archive"
                        type="checkbox"
                        checked={!!blogForm.isArchived}
                        onChange={(e) =>
                          setBlogForm({
                            ...blogForm,
                            isArchived: e.target.checked,
                          })
                        }
                        class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-[#6ecfd5] checked:bg-[#6ecfd5]  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          class="opacity-0 group-has-checked:opacity-100"
                          d="M3 8L6 11L11 3.5"
                          stroke="#000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          class="opacity-0 group-has-indeterminate:opacity-100"
                          d="M3 7H11"
                          stroke="#000"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="text-sm/6">
                    <label for="archive" class="font-medium text-[#6ecfd5]">
                      Archive
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="gap-3 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  navigate(`/dashboard`);
                }}
                className="numans inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-md font-med text-center  black  rounded-lg text-black font-bold bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc]  rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="numans inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-md font-med text-center  black  rounded-lg text-black font-bold bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc]  rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
              >
                Save Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateBlog;
