import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { blogList } from "../redux/blogSlice";
import Markdown from "react-markdown";

const Archived = () => {
  const { blogs } = useSelector((state) => state.blog);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogList());
    console.log("blogList", blogList);
  }, []);
  return (
    <div className="bg-black">
      <div className="text-[#6ecfd5] pt-44 numans text-7xl text-center">
        <div className="flex flex-row justify-self-center">
          <div className="flex flex-row items-center mr-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              fill="currentColor"
              class="bi bi-archive-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z" />
            </svg>
          </div>
          <span className="text-neutral-50">archived</span>2025
        </div>
      </div>

      <div className="mt-10 mx-auto max-w-7xl px-6 lg:px-8 rubik text-center">
        <ul className="text-white px-10 py-8">
          {blogs
            .filter(
              (blog) => blog.isPublished === true && blog.isArchived === true
            )
            .map((blog) => (
              <li key={blog.id} className="mb-4">
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-[#6ecfd5] hover:text-[#60c7cc]"
                >
                  <span className="font-bold text-white">{blog.title}</span>
                  {" — "}
                  <span>
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Archived;
