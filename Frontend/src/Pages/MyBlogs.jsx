import { useState, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { useBlogStore } from "../zustands/Blogs";
import { FiEdit, FiTrash2, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import ModalUpdatePage from "./ModalUpdatePahe";

const MyBlogs = () => {
  const { loading, blogs, getMyblogs, deleteBlog, onUpdate } = useBlogStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    getMyblogs();
  }, [getMyblogs]);

  const handleOpenModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const handleUpdateBlog = (updatedBlog) => {
    onUpdate(updatedBlog, selectedBlog._id);
    handleCloseModal();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#4CAF50" size={15} />
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 min-h-screen p-8">
      <h2
        className="text-5xl font-extrabold text-center mb-10 text-green-600 tracking-wider"
        style={{ fontFamily: "serif" }}
      >
        ✨ My Unique Blogs ✨
      </h2>

      {blogs && blogs.length === 0 ? (
        <div className="flex justify-center items-center text-center p-10">
          <p className="text-2xl text-gray-700 font-semibold">
            🙁 You don&apos;t have any blogs right now!
            <br />
            Click the button below to{" "}
            <Link
              className="text-blue-600 hover:underline text-md"
              to={"/create-blog"}
            >
              Create Blog
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  {blog.content.substring(0, 100)}...
                </p>
                <button
                  className="mt-4 flex items-center text-blue-500 hover:underline"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                >
                  Read More <FiArrowRight className="ml-1" />
                </button>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-600 flex items-center"
                  onClick={() => handleOpenModal(blog)}
                >
                  <FiEdit className="mr-1" /> Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded-lg shadow-md hover:shadow-lg hover:bg-red-600 flex items-center"
                  onClick={async () => await deleteBlog(blog._id)}
                >
                  <FiTrash2 className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <ModalUpdatePage
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdateBlog}
          blog={selectedBlog}
        />
      )}
    </div>
  );
};

export default MyBlogs;
