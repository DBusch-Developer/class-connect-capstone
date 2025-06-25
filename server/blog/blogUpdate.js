import blogModel from "./blogModel.js";

const blogUpdate = async (req, res) => {
  console.log({id: req.params.id, body: req.body, req: req});
  const { id } = req.params;
  console.log("blogUpdate req.body", req.body);
  const {
    title,
    author,
    profilePhoto,
    category,
    readTime,
    body,
    coverPhoto,
    isPublished,
    isArchived
  } = req.body;
  // Validation goes here
  const date = new Date();
  const blog = await blogModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      author,
      profilePhoto,
      category,
      readTime,
      body,
      coverPhoto,
      date,
      isPublished,
      isArchived
    }
  );
  console.log("blog", blog);
  res.status(200).json({ success: true, blog: blog });
};

export default blogUpdate;
