import axios from "axios";

const blogService = {
  blogList: async () => {
    return await axios.get(`${import.meta.env.VITE_NODE_SERVER_URL}/blog`);
  },
  addBlog: async (
    title,
    author,
    profilePhoto,
    category,
    readTime,
    body,
    coverPhoto,
    date,
    comments
  ) => {
    return await axios.post(
      `${import.meta.env.VITE_NODE_SERVER_URL}/blog`,
      {
        title,
        author,
        profilePhoto,
        category,
        readTime,
        body,
        coverPhoto,
        date,
        comments,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  },
  updateBlog: async (id, blogForm) => {
    return await axios.put(
      `${import.meta.env.VITE_NODE_SERVER_URL}/blog/${id}`,
      blogForm,
      { headers: { "Content-Type": "application/json" } }
    );
  },
  getBlog: async (id) => {
    return await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/blog/${id}`,
      { headers: { "Content-Type": "application/json" } }
    );
  },
  deleteBlog: async (id) => {
    return await axios.delete(
      `${import.meta.env.VITE_NODE_SERVER_URL}/blog/${id}`,
      { headers: { "Content-Type": "application/json" } }
    );
  },
  blogCommentCreate: async (id, addComment) => {
    return await axios.post(
      `${import.meta.env.VITE_NODE_SERVER_URL}/blog/${id}/comments`,
      addComment,
      { headers: { "Content-Type": "application/json" } }
    );
  },
  blogCommentDelete: async (blogId, commentId) => {
    return await axios.delete(
      `${
        import.meta.env.VITE_NODE_SERVER_URL
      }/blog/${blogId}/comments/${commentId}`
    );
  },
};

export default blogService;
