import { useEffect } from "react";
import { useBlogStore } from "../zustands/Blogs.js";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const BlogPage = () => {
  const { blogs, loading, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader color="#4CAF50" size={15} />
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-green-100 to-green-300 min-h-screen py-10 px-6">
      <h1 className="text-4xl font-extrabold text-center text-green-700 mb-8">
        Explore Our Blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover" // Ensures the image is fully visible within the container
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-green-600 transition-colors duration-300">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {blog.content.slice(0, 200)}
                {/* Display only the first 200 characters */}
                {blog.content.length > 200 && "..."}
              </p>
              <Link
                to={`/blog/${blog._id}`}
                className="absolute bottom-4 right-4 text-lg text-green-500 font-bold hover:underline transition-colors duration-300"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
