import axios from 'axios'

const userService = {

  userCreate: async (userForm) => {
    return await axios.post(
      `${import.meta.env.VITE_NODE_SERVER_URL}/users`, 
      userForm
    )
  },

  userGetAll: async () => {
    return await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/users/list`, 
    )
  }, 


  userUpdate: async (userEditProfileForm, id) => {
    console.log("service OBJECT ERROR", id, userEditProfileForm)
    const response = await axios.put(
      `${import.meta.env.VITE_NODE_SERVER_URL}/users/${id}`, userEditProfileForm
    )
    console.log("service response", response.data)
    return response.data
  }, 

  userGetOne: async (username) => {
    console.log("service userGetOne username", username)
    const response = await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/users/user/${username}`, 
    )
    console.log("service getOne response", response)
    return response
  }, 

}
export default userService
