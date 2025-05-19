import blogModel from "./blogModel.js";

const blogGetOne = async (req, res) => {
  const { id } = req.params;
  const blog = await blogModel.findOne({ _id: id });
  res.status(200).json(blog);
};

export default blogGetOne;
