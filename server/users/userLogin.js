import * as argon2 from "argon2";
import jwt from "jsonwebtoken"
import userModel from "./userModel.js";

const userLogin = async (req, res) => {
    //Create a function that takes in the parameters of our schema
    const { username, password } = req.body;
    //Validation- if one of the fields is missing,
    if (!username || username == "" || !password || password == "") {
        // then display a message saying login info is incorrect
        res.status(500).json({ "success": false, message: "User information is not valid." });
    } else {
        //Get user by username (without password)
        const loginUser = await userModel.findOne({ username });
        console.log("loginUser", loginUser)
        // If their username is incorrect,
        if (!loginUser) {
            // Display error message
            res.status(500).json({ "success": false, message: "User information is not valid." })
        }
        const isPasswordCorrect = await argon2.verify(loginUser.password, password)
        // Or if their password is incorrect,
        if (!isPasswordCorrect) {
            // Display error message
            res.status(500).json({ "success": false, message: "User information is not valid." })
        }
        //If user exists and password is correct
    console.log(process.env.SECRET_KEY)
    const key = process.env.SECRET_KEY || ""
    const token = jwt.sign({ username }, key)
    console.log("token", token)
    loginUser.token.push(token)
    loginUser.save()
    console.log("loginUser", loginUser)

    const user = { firstName: loginUser.firstName,
                   lastName: loginUser.lastName,
                   username: loginUser.username,
                   token: loginUser.token,
                   role: loginUser.role
                 }
                 res.status(200).json({ "success": true, message: "User logged in.", user });
    }
  }


export default userLogin;
