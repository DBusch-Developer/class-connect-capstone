import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { blogList } from "../redux/blogSlice";
import Markdown from "react-markdown";

const BlogList = () => {
  const { blogs } = useSelector((state) => state.blog);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogList());
    console.log("blogList", blogList);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="absolute fixed top-50 left-430 text-white numans text-xl text-center">
        <div className="flex flex-row items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-archive-fill"
            viewBox="0 0 16 16"
          >
            <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z" />
          </svg>
          <div className="ml-2 text-[#6ecfd5]">Archived</div>
        </div>
        <Link to="/archived">
          <div className="flex justify-end">2025</div>
        </Link>
      </div>
      <div className="bg-black">
        <div className="text-[#6ecfd5] pt-44 numans text-7xl text-center">
          <div className="flex flex-row justify-self-center">
            <img src="plug.svg" className="h-18 mr-2" alt="Flowbite Logo" />
            <span className="text-neutral-50">blog</span>Connect
          </div>
        </div>

        <div className=" py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 rubik">
            <div className="article-bg shadow">
              <div className="pl-7 pr-7 pt-7 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 sm:mt-7 sm:pt-7 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                {blogs
                  .filter(
                    (blog) =>
                      blog.isPublished === true && blog.isArchived === false
                  )
                  .map((blog) => (
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
                        <div className="mt-5 line-clamp-3 text-md text-white">
                          <Markdown>{blog.body}</Markdown>
                        </div>
                      </div>

                      <div className="flex flex-row">
                        <Link to={`/blog/${blog.id}`}>
                          <button
                            type="button"
                            className="text-black font-bold mt-7 ml-90 bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc] rounded-lg text-sm px-4 py-2 text-center numans cursor-pointer"
                          >
                            Read More...
                          </button>
                        </Link>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;
