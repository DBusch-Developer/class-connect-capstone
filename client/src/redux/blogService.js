import axios from "axios";

const blogService = {
  blogList: async () => {
    return await axios.get(`${import.meta.env.VITE_NODE_SERVER_URL}/blog`);
  },
  addBlog: async ( title,
    author,
    authorTitle,
    profilePhoto,
    category,
    readTime,
    body,
    coverPhoto,
    date,
    comment) => {
    return await axios.post(
      `${import.meta.env.VITE_NODE_SERVER_URL}/blog`,
      {  title,
        author,
        authorTitle,
        profilePhoto,
        category,
        readTime,
        body,
        coverPhoto,
        date,
        comment},
      { headers: { "Content-Type": "application/json" } }
    );
  },
  updateBlog: async (id, blog) => {
    return await axios.put(
      `${import.meta.env.VITE_NODE_SERVER_URL}/blog/${id}`,
      blog,
      { headers: { "Content-Type": "application/json" } }
    );
  },
  getBlog: async (id) => {
    return await axios.get(
    `${import.meta.env.VITE_NODE_SERVER_URL}/blog/${id}`,
    { headers: { "Content-Type": "application/json" } }
    )
  },
  deleteBlog: async (id) => {
    return await axios.delete(
      `${import.meta.env.VITE_NODE_SERVER_URL}/blog/${id}`,
      { headers: { "Content-Type": "application/json" } }
    );
  },
};

export default blogService;
