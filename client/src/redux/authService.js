import axios from "axios";

const authService = {
  authLogin: async (username, password) => {
    return await axios.post(
      `${import.meta.env.VITE_NODE_SERVER_URL}/auth/login`,
      { username, password }
      // {} // token?!?!
    );
  },
  checkLogin: async (token) => {
    return await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/auth/status`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      // {} // token?!?!
    );
  },
  logout: async (token, username) => {
    return await axios.post(
      `${import.meta.env.VITE_NODE_SERVER_URL}/auth/logout/${username}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      // {} // token?!?!
    );
  },
};
export default authService;
