import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userGetOne } from "../redux/userSlice";
import { blogList } from "../redux/blogSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blog);

  const isAdmin = user.role && user.role.includes("Admin");
  const [showAll, setShowAll] = useState(isAdmin);
  const [showReviewRequired, setShowReviewRequired] = useState(false);
  const [showYourBlogs, setShowYourBlogPosts] = useState(!isAdmin);

  const loggedInUser = user.username;

  console.log("loggedInUser", loggedInUser);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(userGetOne(loggedInUser));
  }, []);

  useEffect(() => {
    dispatch(blogList());
    console.log("blogList", blogList);
  }, []);

  const pendingBlogs = blogs.filter(
    (blog) => blog.isPublished === false && blog.isArchived === false
  );
  const yourBlogs = blogs.filter((blog) => blog.author === user.username);
  const allBlogs = blogs; // all blogs

  const handleAll = () => {
    setShowAll(true);
    setShowReviewRequired(false);
    setShowYourBlogPosts(false);
  };

  const handleReviewRequired = () => {
    setShowAll(false);
    setShowReviewRequired(true);
    setShowYourBlogPosts(false);
  };

  const handleYourBlogPosts = () => {
    setShowAll(false);
    setShowReviewRequired(false);
    setShowYourBlogPosts(true);
  };

  return (
    <>
      <div className="text-[#6ecfd5] pt-44 numans text-7xl text-center">
        <div className="flex flex-row justify-self-center">
          <img src="plug.svg" className="h-18 mr-2" alt="Flowbite Logo" />
          <span className="text-neutral-50">dashboard</span>Connect
        </div>
        <div className="flex items-center  justify-center">
          <h1 className="text-white text-4xl font-bold mt-10">
            Welcome,{" "}
            <span className="text-[#6ecfd5]">
              {user.firstName} {user.lastName}
            </span>
            !
          </h1>
          <div className="flex flex-row items-center justify-center">
            <div className="ml-20">
              <Link to="/add-blog">
                <button
                  type="button"
                  className="text-black font-bold bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc]  rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                  Add Blog Post
                </button>
              </Link>
            </div>

            <div className="m-5">
              {user.role.includes("Admin") && (
                <div className="m-5">
                  <Link to="/user-create">
                    <button
                      type="button"
                      className="mr-5 text-black font-bold bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc]  rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                    >
                      Add User
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20 p-4 flex flex-row justify-center gap-8 font-bold numans text-xl">
          {user.role.includes("Admin") ? (
            <>
              <button
                onClick={handleAll}
                className={`cursor-pointer ${
                  showAll === true ? "text-[#6ecfd5]" : "text-gray-200 type"
                }`}
              >
                All
              </button>
              <button
                onClick={handleReviewRequired}
                className={`cursor-pointer ${
                  showReviewRequired === true
                    ? "text-[#6ecfd5]"
                    : "text-gray-200 type"
                }`}
              >
                Review Required
              </button>
              <button
                onClick={handleYourBlogPosts}
                className={`cursor-pointer ${
                  showYourBlogs === true
                    ? "text-[#6ecfd5]"
                    : "text-gray-200 type"
                }`}
              >
                Your Blog Posts
              </button>
            </>
          ) : (
            <button
              onClick={handleYourBlogPosts}
              className={`cursor-pointer ${
                showYourBlogs === true ? "text-[#6ecfd5]" : "text-gray-200 type"
              }`}
            >
              Your Blog Posts
            </button>
          )}
        </div>

        {/* Pending Blogs */}
        {showReviewRequired && (
          <div className="py-8">
            {user.role.includes("Admin") && (
              <div className="py-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 rubik">
                  <div className="article-bg shadow">
                    <div className="pl-7 pr-7 pt-7 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 sm:mt-7 sm:pt-7 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                      {pendingBlogs.length === 0 ? (
                        <div className="text-xl text-neutral-50 text-center w-full col-span-2">
                          No action required
                        </div>
                      ) : (
                        pendingBlogs.map((blog) => (
                          <article
                            key={blog.id}
                            className="border rounded-md border-neutral-800 p-10 flex flex-col items-start justify-between"
                          >
                            <img
                              className="m-auto rounded-md h-50 w-100"
                              src={`${blog.coverPhoto}`}
                            />
                            <Link reloadDocument to={`/blog/${blog.id}`}>
                              <h3 className="pt-7 text-2xl text-white group-hover:text-gray-600">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: blog.title,
                                  }}
                                />
                              </h3>
                            </Link>

                            <div className="flex items-center gap-x-4 text-xs pt-4">
                              <img
                                className="rounded-full size-12"
                                src={`${blog.profilePhoto}`}
                              />
                              <div className="text-white">{blog.author}</div>
                              <time className=" text-white">
                                {new Date(blog.date).toLocaleString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </time>
                              <a
                                href="#"
                                className="relative z-10 rounded-full px-3 py-1.5 font-medium text-white "
                              >
                                #{blog.category}
                              </a>
                              <span className="flex items-end text-white">
                                {blog.readTime} min read
                              </span>
                            </div>
                            <div className="group relative mb-none">
                              <div className="mt-5 line-clamp-3 text-sm text-white">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: blog.body,
                                  }}
                                />
                              </div>
                            </div>

                            <div className="flex flex-row">
                              {blog.author === user.username ||
                              user.role.includes("Admin") ? (
                                <Link to={`/update-blog/${blog.id}`}>
                                  <button
                                    type="button"
                                    className="text-black font-bold mt-7 ml-90 bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc] rounded-lg text-sm px-4 py-2 text-center numans cursor-pointer"
                                  >
                                    Update Blog
                                  </button>
                                </Link>
                              ) : null}
                            </div>
                          </article>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Your/Admin Blogs */}
        {showYourBlogs && (
          <div className="py-8">
            <div className="pb-20">
              <div className="mx-auto max-w-7xl px-6 lg:px-8 rubik">
                <div className="article-bg shadow">
                  <div className="pl-7 pr-7 pt-7 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 sm:pt-7 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    {yourBlogs.map((blog) => (
                      <article
                        key={blog.id}
                        className="border rounded-md border-neutral-800 p-10 flex flex-col items-start justify-between"
                      >
                        <img
                          className="m-auto rounded-md h-50 w-100"
                          src={`${blog.coverPhoto}`}
                        />
                        <Link reloadDocument to={`/blog/${blog.id}`}>
                          <h3 className="pt-7 text-2xl text-white group-hover:text-gray-600">
                            <div
                              dangerouslySetInnerHTML={{ __html: blog.title }}
                            />
                          </h3>
                        </Link>

                        <div className="flex items-center gap-x-4 text-xs pt-4">
                          <img
                            className="rounded-full size-12"
                            src={`${blog.profilePhoto}`}
                          />
                          <div className="text-white">{blog.author}</div>
                          <time className=" text-white">
                            {new Date(blog.date).toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                          <a
                            href="#"
                            className="relative z-10 rounded-full px-3 py-1.5 font-medium text-white "
                          >
                            #{blog.category}
                          </a>
                          <span className="flex items-end text-white">
                            {blog.readTime} min read
                          </span>
                        </div>
                        <div className="group relative mb-none">
                          <div className="mt-5 line-clamp-3 text-sm text-white">
                            <div
                              dangerouslySetInnerHTML={{ __html: blog.body }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-row">
                          {blog.author === user.username ||
                          user.role.includes("Admin") ? (
                            <Link to={`/update-blog/${blog.id}`}>
                              <button
                                type="button"
                                className="text-black font-bold mt-7 ml-90 bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc] rounded-lg text-sm px-4 py-2 text-center numans cursor-pointer"
                              >
                                Update Blog
                              </button>
                            </Link>
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Blogs */}
        {showAll && (
          <div className="py-8">
            {user.role.includes("Admin") && (
              <div className="pb-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 rubik">
                  <div className="article-bg shadow">
                    <div className="pl-7 pr-7 pt-7 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 sm:pt-7 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                      {allBlogs.map((blog) => (
                        <article
                          key={blog.id}
                          className="border rounded-md border-neutral-800 p-10 flex flex-col items-start justify-between"
                        >
                          <img
                            className="m-auto rounded-md h-50 w-100"
                            src={`${blog.coverPhoto}`}
                          />
                          <Link reloadDocument to={`/blog/${blog.id}`}>
                            <h3 className="pt-7 text-2xl text-white group-hover:text-gray-600">
                              <div
                                dangerouslySetInnerHTML={{ __html: blog.title }}
                              />
                            </h3>
                          </Link>

                          <div className="flex items-center gap-x-4 text-xs pt-4">
                            <img
                              className="rounded-full size-12"
                              src={`${blog.profilePhoto}`}
                            />
                            <div className="text-white">{blog.author}</div>
                            <time className=" text-white">
                              {new Date(blog.date).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </time>
                            <a
                              href="#"
                              className="relative z-10 rounded-full px-3 py-1.5 font-medium text-white "
                            >
                              #{blog.category}
                            </a>
                            <span className="flex items-end text-white">
                              {blog.readTime} min read
                            </span>
                          </div>
                          <div className="group relative mb-none">
                            <div className="mt-5 line-clamp-3 text-sm text-white">
                              <div
                                dangerouslySetInnerHTML={{ __html: blog.body }}
                              />
                            </div>
                          </div>

                          <div className="flex flex-row">
                            {blog.author === user.username ||
                            user.role.includes("Admin") ? (
                              <Link to={`/update-blog/${blog.id}`}>
                                <button
                                  type="button"
                                  className="text-black font-bold mt-7 ml-90 bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc] rounded-lg text-sm px-4 py-2 text-center numans cursor-pointer"
                                >
                                  Update Blog
                                </button>
                              </Link>
                            ) : null}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;


