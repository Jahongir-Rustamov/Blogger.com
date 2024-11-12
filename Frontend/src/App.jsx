import { HashLoader } from "react-spinners";
import { Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import HomePage from "./Pages/HomePage";
import Navbar from "./components/Navbar";
import SignUp from "./Pages/SignUp";
import LogInPage from "./Pages/LogInPage";
import CreateBlogPage from "./Pages/CreateBlogPage";
import BlogPage from "./Pages/BlogPage";
import MyBlogs from "./Pages/MyBlogs";
import ReadMore from "./components/ReadMore";
import { Toaster } from "react-hot-toast";
import { createUser } from "./zustands/user";
import { useEffect } from "react";

const App = () => {
  const { user, checkAuth, checkAuthing } = createUser();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkAuthing) {
    return (
      <motion.div
        className="flex justify-center items-center h-screen"
        animate={{
          backgroundColor: ["#31681a", "#4CAF50", "#31681a"], // Ranglar oralig‘i
        }}
        transition={{
          duration: 3, // Har bir sikl davomiyligi
          repeat: Infinity, // Cheksiz takrorlanish
          ease: "easeInOut",
        }}
      >
        <HashLoader color="#ffffff" size={65} />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-50 pt-16">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!user ? <LogInPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/create-blog"
            element={user ? <CreateBlogPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/my_blogs"
            element={user ? <MyBlogs /> : <Navigate to={"/"} />}
          />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blog/:id" element={<ReadMore />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
