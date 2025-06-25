import * as argon2 from "argon2"
import userModel from "./userModel.js"


const userCreate = async (req, res) => {
    //Create a function that takes in the parameters of our user schema
    const { firstName, lastName, username, password, role, avatar } = req.body
    //Validation- if one of the fields is missing,
    if (
        (!firstName || firstName == "") ||
        (!lastName || lastName == "") ||
        (!username || username == "") ||
        (!password || password == "")   
    ) 
    // then display a message saying login info is incorrect
    {
        res.status(500).json({ "message": "User information is not valid." })
    }
    else 
    // let them create an account
    {
        const hashedPassword = await argon2.hash(password)

        const newUser = await userModel.create({ firstName, lastName, username, password: hashedPassword, role: [ role ], avatar })
        console.log("newUser", newUser)

        res.status(200).json({ "success": true, "message": "User created." })
    }
}

export default userCreate