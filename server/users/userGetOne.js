import userModel from "./userModel.js"

const userGetOne = async (req, res) => {
    const { username } = req.params;
    const user = await userModel.findOne( {username} );
    res.status(200).json(user);
    }

export default userGetOne

