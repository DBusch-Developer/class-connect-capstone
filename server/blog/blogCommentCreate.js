import blogModel from "./blogModel.js"

const blogCommentCreate = async (req, res) => {
  const { id } = req.params
  const { username, timeStamp, comment, profilePhoto } = req.body
  console.log("req.body", req.body)
  console.log("id", id)

  const newComment = await blogModel.find({ _id: id })
  const tempComment = { timeStamp, username, comment, profilePhoto }

  newComment[0].comments.push(tempComment)

  const addComment = await blogModel.findOne({ _id: id })
  addComment.comments.push(tempComment)
  addComment.save()


  res.status(200).json({ success: true, blog: addComment })
}

export default blogCommentCreate
