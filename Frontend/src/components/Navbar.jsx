import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { createUser } from "../zustands/user.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = createUser();
  const handlelogout = async () => {
    await logout();
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-customLightGreen shadow-md p-4 fixed top-0 w-full flex items-center justify-between z-50">
      <Link
        to="/"
        className="text-xl md:text-2xl font-semibold text-[#4CAF50] flex items-center"
      >
        <img src="/LOGO.webp" alt="Logo" className="w-6 md:w-8 mr-2" />
        Blogger
      </Link>

      <div className="hidden md:flex items-center space-x-4">
        <Link
          to="/blogs"
          className="text-lg font-medium text-[#4CAF50] hover:text-white hover:bg-[#4CAF50] px-2 py-1 rounded-md transition duration-200"
        >
          Blogs
        </Link>
        {user && (
          <Link
            to="/my_blogs"
            className="text-lg font-medium text-[#4CAF50] hover:text-white hover:bg-[#4CAF50] px-2 py-1 rounded-md transition duration-200"
          >
            MyBlogs
          </Link>
        )}
        <Link
          to="/create-blog"
          className="bg-bg text-white px-4 py-2 rounded-md hover:bg-green-800 transition duration-200"
        >
          Create Blog
        </Link>

        {user ? (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
            onClick={handlelogout}
          >
            LogOut
          </button>
        ) : (
          <>
            <Link
              to="/signup"
              className="text-[#4CAF50] border border-[#4CAF50] px-4 py-2 rounded-md hover:text-white hover:bg-[#4CAF50] transition duration-200"
            >
              SignUp
            </Link>
            <Link
              to="/login"
              className="text-[#4CAF50] border border-[#4CAF50] px-4 py-2 rounded-md hover:text-white hover:bg-[#4CAF50] transition duration-200"
            >
              LogIn
            </Link>
          </>
        )}
      </div>

      <div className="md:hidden flex items-center">
        <button
          className="text-[#4CAF50] text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          &#9776;
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-customLightGreen shadow-lg p-4 flex flex-col space-y-4 z-40">
          <Link
            to="/blogs"
            className={`text-lg font-medium text-[#4CAF50] px-4 py-2 rounded-md transition duration-200 ${
              isOpen ? "border border-[#4CAF50]" : ""
            } hover:text-white hover:bg-[#4CAF50]`}
            onClick={() => setIsOpen(false)}
          >
            Bloglar
          </Link>
          {user && (
            <Link
              to="/my_blogs"
              className={`text-lg font-medium text-[#4CAF50] px-4 py-2 rounded-md transition duration-200 ${
                isOpen ? "border border-[#4CAF50]" : ""
              } hover:text-white hover:bg-[#4CAF50]`}
              onClick={() => setIsOpen(false)}
            >
              My Blogs
            </Link>
          )}
          <Link
            to="/create-blog"
            className={`bg-bg text-white px-4 py-2 rounded-md transition duration-200 ${
              isOpen ? "border border-[#4CAF50]" : ""
            } hover:bg-green-800`}
            onClick={() => setIsOpen(false)}
          >
            Create Blog
          </Link>

          {user ? (
            <button
              className={`bg-red-500 text-white px-4 py-2 rounded-md transition duration-200 ${
                isOpen ? "border border-red-700" : ""
              } hover:bg-red-700`}
              onClick={() => (logout(), setIsOpen(false))}
            >
              LogOut
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className={`text-[#4CAF50] border border-[#4CAF50] px-4 py-2 rounded-md transition duration-200 ${
                  isOpen ? "border border-[#4CAF50]" : ""
                } hover:text-white hover:bg-[#4CAF50]`}
                onClick={() => setIsOpen(false)}
              >
                SignUp
              </Link>
              <Link
                to="/login"
                className={`text-[#4CAF50] border border-[#4CAF50] px-4 py-2 rounded-md transition duration-200 ${
                  isOpen ? "border border-[#4CAF50]" : ""
                } hover:text-white hover:bg-[#4CAF50]`}
                onClick={() => setIsOpen(false)}
              >
                LogIn
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
