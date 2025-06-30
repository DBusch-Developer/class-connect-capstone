import userModel from "../user/userModel.js";

const logout = async (req, res) => {
  console.log("logout");
  const { username } = req.params;

  const removeToken = await userModel.updateOne(
    { username: username },
    { token: [] }
  );
  res.status(200).json({ success: true, message: "Logged out." });
  // if (!req.user) {
  //   res.status(401).json({ message: "Not authenticated." });
  // }
  // try {
  //   // Remove user token
  //   const removeToken = await userModel.updateOne(
  //     { _id: req.user._id },
  //     { token: [] }
  //   );

  //   // Passport/Express logout
  //   req.logout((err) => {
  //     if (err) {
  //       return res.status(400);
  //     }
  //     res.status(200).json({ success: true, message: "Logged out." });
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ message: "Logged out." });
  // }
};

export default logout;
