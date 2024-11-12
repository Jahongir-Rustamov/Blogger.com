import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative h-screen bg-[#4CAF50] flex items-center justify-center font-serif text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] to-transparent opacity-80"></div>
      <div className="relative z-10 text-center px-10">
        <h1
          className="text-8xl font-extrabold text-black drop-shadow-lg pb-2"
          style={{ fontFamily: "Sacramento, cursive" }}
        >
          &ldquo;Blogger&rdquo;
        </h1>
        <p
          className="text-lg mt-2 text-gray-800 italic drop-shadow-md"
          style={{ fontFamily: "Pacifico, cursive" }}
        >
          Discover or learn about interesting blogs !
        </p>
        <h2
          className="text-4xl font-extrabold text-orange-500 drop-shadow-2xl mt-5"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Create a Blog
        </h2>
        <p className="text-lg mt-2 text-gray-300 italic drop-shadow-md">
          Run your blog with us
        </p>
        <Link to="/create-blog">
          <div
            className="mt-4 px-6 py-3 bg-white text-[#4CAF50] font-semibold rounded-full shadow-lg 
          transform hover:scale-105 hover:bg-orange-400 hover:text-white transition-all duration-300 cursor-pointer"
          >
            Create Blog
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
