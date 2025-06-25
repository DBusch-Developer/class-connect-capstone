import blogModel from "./blogModel.js"

const blogCommentDelete = async (req, res) => {
  const { blogId, commentId } = req.params

  //Validation
  if (!blogId || blogId == "" || !commentId || commentId == "") {
    res.status(500).json({ message: "Blog comment information not valid." })
  } else {
    const deleteComment = await blogModel.updateOne(
      { _id: blogId },
      {
        $pull: { comments: { _id: commentId } }
      }
    )
    const getBlog = await blogModel.findOne({ _id: blogId })
    console.log("deleteComment", deleteComment)
    console.log("getBlog", getBlog)
    res
      .status(200)
      .json({ success: true, message: "Comment deleted.", blog: getBlog })
  }
}

export default blogCommentDelete
