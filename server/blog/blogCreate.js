import blogModel from "./blogModel.js";

const blogCreate = async (req, res) => {
  const { title, author, authorTitle, profilePhoto, category, readTime, body, coverPhoto, comment } = req.body;
  // Validation goes here
  const blog = await blogModel.create({
    title,
    author,
    authorTitle,
    profilePhoto,
    category,
    readTime,
    body, 
    coverPhoto,
    comment
  });
  console.log("blog", blog);
  res.status(200).json({ success: true, blog: blog });
};

export default blogCreate;
