import blogModel from "./blogModel.js";

const blogDelete = async (req, res) => {
  const { id } = req.params;
  const blog = await blogModel.findOneAndDelete({ _id: id });
  res.status(200).json({ "success": true })
};

export default blogDelete;
