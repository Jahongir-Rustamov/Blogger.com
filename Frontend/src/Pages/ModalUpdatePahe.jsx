import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ModalUpdatePage = ({ isOpen, onClose, onUpdate, blog }) => {
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [imageUrl, setImageUrl] = useState(blog?.image || "");

  useEffect(() => {
    if (isOpen && blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setImageUrl(blog.image);
    }
  }, [isOpen, blog]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transition-transform transform hover:scale-105"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Update Blog</h2>

        <input
          type="text"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          placeholder="Blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <input
          type="text"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transform hover:scale-105 font-bold transition duration-300 ease-in-out"
          onClick={() => onUpdate({ title, content, imageUrl })}
        >
          Are you sure Update
        </button>
      </div>
    </div>
  );
};

export default ModalUpdatePage;
