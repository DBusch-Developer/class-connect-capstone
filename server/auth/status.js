import userModel from "../user/userModel.js";

const status = async (req, res, next) => {
  console.log("req.user", req.user._id.toString());
  if (!req.user) {
    res.status(401).json({ message: "Not authenticated." });
  } else {
    const user = await userModel.findOne({ _id: req.user._id  });
    console.log("user", user);
    res.status(200).json({ message: "You did it!", user: user });
  }
};
export default status;
