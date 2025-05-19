import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getBlog } from "../redux/blogSlice";
import Markdown from "react-markdown"

const BlogDetail = () => {
  const { blog } = useSelector((state) => state.blog);
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("blog", id);
    dispatch(getBlog(id));
    console.log("blog", blog);
  }, []);

  useEffect(() => {
    console.log("blog", blog);
  }, [blog]);

  return (
    <>
      <div className="p-30 flex flex-col m-auto  w-1/2">
        <img
          className="rounded-md h-50%"
          src={
            new URL(
              `../assets/images/${blog.coverPhoto.slice(12)}`,
              import.meta.url
            ).href
          }
        />
        <div className="text-white text-4xl mt-10 font-bold">
          {" "}
          {blog.title}
        </div>
        <div className="flex flex-row items-center mt-10 mb-none gap-x-4 max-h-20 mb-5">
          <div>
            <img
              className="rounded-full size-12"
              src={
                new URL(
                  `../assets/images/${blog.profilePhoto.slice(12)}`,
                  import.meta.url
                ).href
              }
            />
          </div>
          <div className="">
            <p className="font-semibold text-md text-white ">{blog.author}</p>
          </div>
          <div>
            <p className="font-semibold text-md text-white">
              {new Date (blog.date).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <span className="flex items-end text-white">
              {blog.readTime} min read
            </span>
          </div>
          <div>
            {/* <p className="font-semibold text-md text-white">{blog.authorTitle}</p> */}
          </div>
        </div>
        <p className="text-white text-lg"><Markdown>{blog.body}</Markdown></p>
      </div>
    </>
  );
};

export default BlogDetail;
