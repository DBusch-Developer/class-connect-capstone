import blogModel from "./blogModel.js";

const blogUpdate = async (req, res) => {
  const { id } = req.params;
  const { title, author, authorTitle, profilePhoto, category, readTime, body, coverPhoto } =
    req.body;
  // Validation goes here
  const date = new Date()
  const blog = await blogModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      author,
      authorTitle,
      profilePhoto,
      category,
      readTime,
      body,
      coverPhoto,
      date
    }
  );
  console.log("blog", blog);
  res.status(200).json({ success: true, blog: blog });
};

export default blogUpdate;
