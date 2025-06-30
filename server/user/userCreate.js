import * as argon2 from "argon2"
import userModel from "./userModel.js"

const userCreate = async (req, res, done) => {
    const { firstName, lastName, username, password, role, avatar, authStrategy = "local" } = req.body
    // Validation

    // Hash password
    const hashedPassword = await argon2.hash(password)
    const createUser = await userModel.create({ firstName, lastName, username, role, avatar, password: hashedPassword, authStrategy })
    res.status(200).json({ message: "You did it!" })
}

export default userCreate