
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import BlogList from "./pages/BlogList";
import Wiki from "./pages/Wiki"
import Whitelist from "./pages/Whitelist"
import BlogDetail from "./pages/BlogDetail";
import AddBlog from "./pages/AddBlog";
import UpdateBlog from "./pages/UpdateBlog";
import './App.css'

function App() {

  return (
    <>
    <Navbar />
       <Routes>
       <Route path="/" element={<Home  />} />
        <Route path="/blog-list" element={<BlogList  />} />
        <Route path="/wiki" element={<Wiki  />} />
        <Route path="/whitelist" element={<Whitelist  />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/update-blog/:id" element={<UpdateBlog />} />
        <Route path="/add-blog" element={<AddBlog  />}
        />
      </Routes>
    </>
  )
}

export default App
