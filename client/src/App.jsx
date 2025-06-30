import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import Wiki from "./pages/Wiki";
import Whitelist from "./pages/Whitelist";
import Ollama from "./pages/Ollama";
import BlogDetail from "./pages/BlogDetail";
import BlogAdd from "./pages/BlogAdd";
import BlogUpdate from "./pages/BlogUpdate";
import UserCreate from "./pages/UserCreate";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Archived from "./pages/Archived";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import { userGetAll } from "./redux/userSlice";
import { checkLogin } from "./redux/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(userGetAll());
  }, []);

  useEffect(() => {
    if (user.token) {
      const checkToken = async () => {
        const loginToken = sessionStorage.getItem("token");
        dispatch(checkLogin(loginToken));
      };
      checkToken();
    }
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex flex-col min-h-screen ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog-list" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/archived" element={<Archived />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/whitelist" element={<Whitelist />} />
          <Route path="/ollama" element={<Ollama />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-create" element={<UserCreate />} />
            <Route path="/add-blog" element={<BlogAdd />} />
            <Route path="/update-blog/:id" element={<BlogUpdate />} />
          </Route>
        </Routes>
        {location.pathname !== "/" && <Footer />}
      </div>
    </>
  );
}

export default App;
