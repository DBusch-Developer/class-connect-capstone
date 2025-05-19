import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { blogList } from "../redux/blogSlice";
import Markdown from "react-markdown";

// const blogs = [
//   {
//     title: "How to land your first developer job",
//     author: "Per Borgen",
//     authorTitle: "Senior Dev",
//     profilePhoto: "",
//     category: "JavaScript",
//     readTime: "9",
//     body: "Getting that all-important first developer job isn't easy, especially if you're a self-taught programmer without university-provided career services or internships. As the founder of a code-learning platform, I have witnessed hundreds of people globally make a successful break into the tech industry, many of whom had no CS degree or support from a school. Those who succeed often use non-obvious strategies that go beyond the conventional advice of crafting a solid resume, building a portfolio, writing a cover letter and so forth. ",
//     coverPhoto: "classconnect-plus.jpg",
//     date: "3/8/2025",
//   },
//   {
//     title: "How to land your first developer job",
//     author: "Per Borgen",
//     authorTitle: "Senior Dev",
//     profilePhoto: "",
//     category: "JavaScript",
//     readTime: "9",
//     body: "Getting that all-important first developer job isn't easy, especially if you're a self-taught programmer without university-provided career services or internships. As the founder of a code-learning platform, I have witnessed hundreds of people globally make a successful break into the tech industry, many of whom had no CS degree or support from a school. Those who succeed often use non-obvious strategies that go beyond the conventional advice of crafting a solid resume, building a portfolio, writing a cover letter and so forth. ",
//     coverPhoto: "classconnect-plus.jpg",
//     date: "March 14, 2025",
//   },
//   {
//     title: "How to land your first developer job",
//     author: "Per Borgen",
//     authorTitle: "Senior Dev",
//     profilePhoto: "",
//     category: "JavaScript",
//     readTime: "9",
//     body: "Getting that all-important first developer job isn't easy, especially if you're a self-taught programmer without university-provided career services or internships. As the founder of a code-learning platform, I have witnessed hundreds of people globally make a successful break into the tech industry, many of whom had no CS degree or support from a school. Those who succeed often use non-obvious strategies that go beyond the conventional advice of crafting a solid resume, building a portfolio, writing a cover letter and so forth. ",
//     coverPhoto: "classconnect-plus.jpg",
//     date: "3/8/2025",
//   },
//   {
//     title: "How to land your first developer job",
//     author: "Per Borgen",
//     authorTitle: "Senior Dev",
//     profilePhoto: "",
//     category: "JavaScript",
//     readTime: "9",
//     body: "Getting that all-important first developer job isn't easy, especially if you're a self-taught programmer without university-provided career services or internships. As the founder of a code-learning platform, I have witnessed hundreds of people globally make a successful break into the tech industry, many of whom had no CS degree or support from a school. Those who succeed often use non-obvious strategies that go beyond the conventional advice of crafting a solid resume, building a portfolio, writing a cover letter and so forth. ",
//     coverPhoto: "classconnect-plus.jpg",
//     date: "3/8/2025",
//   },
// ];

const BlogList = () => {
  const { blogs } = useSelector((state) => state.blog);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogList());
    console.log("blogList", blogList);
  }, []);

  return (
    <>
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
                {blogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="border rounded-md border-neutral-800 p-10 flex flex-col items-start justify-between"
                  >
                    <img
                      className="m-auto rounded-md h-50 w-100"
                      src={
                        new URL(
                          `../assets/images/${blog.coverPhoto.slice(12)}`,
                          import.meta.url
                        ).href
                      }
                    />
                    <Link reloadDocument to={`/blog/${blog.id}`}>
                      <h3 className="pt-7 text-2xl text-white group-hover:text-gray-600">
                        <div dangerouslySetInnerHTML={{ __html: blog.title }} />
                      </h3>
                    </Link>

                    <div className="flex items-center gap-x-4 text-xs pt-4">
                      <img
                        className="rounded-full size-12"
                        src={
                          new URL(
                            `../assets/images/${blog.profilePhoto.slice(12)}`,
                            import.meta.url
                          ).href
                        }
                      />
                      <div className="text-white">{blog.author}</div>
                      {/* <p className="text-white">{blog.authorTitle}</p> */}
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
                        {/* <div
                          className="line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: blog.body }}
                        /> */}
                        <Markdown>{blog.body}</Markdown>
                      </div>
                    </div>
                    {/* <div className="flex mt-10 mb-none gap-x-4 max-h-20">
                      <img
                        className="profile-pic"
                        src={
                          new URL(
                            `./assets/${blog.profilePhoto}`,
                            import.meta.url
                          ).href
                        }
                      />
                      <div className="text-sm/6">
                        <p className="font-semibold text-gray-900">
                          <a>
                            <span className=""></span>
                            {blog.author}
                          </a>
                        </p>
                        <p className="text-gray-600">{blog.authorTitle}</p>
                      </div>
                    </div> */}
                    <div className="flex flex-row">
                      <Link to={`/blog/${blog.id}`}>
                        <button
                          type="button"
                          className="text-black font-bold mt-7 ml-90 bg-[#6ecfd5] hover:bg-[#60c7cc] focus:ring-4 focus:outline-none focus:ring-[#60c7cc] rounded-lg text-sm px-4 py-2 text-center numans"
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
