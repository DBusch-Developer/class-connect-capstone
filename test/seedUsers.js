import "dotenv/config"
import axios from "axios"

const seedUsers = [
    {
      firstName: 'Diana',
      lastName: 'Busch',
      username: 'dbusch',
      password: 'test',
      role: 'Admin'
    }

]

console.log("seedUsers", seedUsers)

seedUsers.forEach(async (user) => {
    const addUser = await axios.post(`${process.env.SERVER_URL}/users`, user)
    console.log("addUser", addUser.data)
})
