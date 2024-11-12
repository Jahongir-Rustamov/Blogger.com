import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogStore } from "../zustands/Blogs";
import { ClimbingBoxLoader } from "react-spinners";

const ReadMore = () => {
  const { ReadMore, singleBlog, loading } = useBlogStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    ReadMore(id);
  }, [ReadMore, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e9f5e1] to-[#ffffff]">
        <ClimbingBoxLoader color="#3c9657" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-11 bg-gradient-to-r from-[#e9f5e1] to-[#ffffff] min-h-screen text-gray-800">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="relative w-full h-60 md:h-80 lg:h-96 overflow-hidden group">
          <img
            src={singleBlog?.image}
            alt={singleBlog?.title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
          />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-3xl md:text-4xl font-bold">
              {singleBlog?.title}
            </h1>
          </div>
        </div>
        <div className="p-6 md:p-8 lg:p-10 bg-white shadow-lg hover:shadow-2xl rounded-b-lg">
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            {singleBlog?.content}
          </p>
          <button
            onClick={() => navigate("/blogs")}
            className="relative px-8 py-3 font-bold text-white rounded-full transition-all duration-300 group hover:scale-105"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#34d399] via-[#10b981] to-[#065f46] rounded-full opacity-50 blur-md group-hover:blur-xl transition-all duration-500"></span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#f97316] via-[#facc15] to-[#10b981] rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300"></span>
            <span className="relative text-lg group-hover:text-[#fff5b7] transition-all duration-300">
              👀 Explore Blogs
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
