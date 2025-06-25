import blogModel from "./blogModel.js";

const blogCreate = async (req, res) => {
  const {
    title,
    author,
    profilePhoto,
    category,
    readTime,
    body,
    coverPhoto,
    comment,
    isPublished = false,
    isArchived = false,
  } = req.body;
  // Validation goes here
  const blog = await blogModel.create({
    title,
    author,
    profilePhoto,
    category,
    readTime,
    body,
    coverPhoto,
    comment,
    isPublished,
    isArchived
  });
  console.log("blog", blog);
  res.status(200).json({ success: true, blog: blog });
};

export default blogCreate;
