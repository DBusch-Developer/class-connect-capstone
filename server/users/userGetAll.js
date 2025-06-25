import userModel from "./userModel.js"

const userGetAll = async (req, res) => {
  const getUsers = await userModel.find()
  res.status(200).json({ success: true, "users": getUsers })
}

export default userGetAll
