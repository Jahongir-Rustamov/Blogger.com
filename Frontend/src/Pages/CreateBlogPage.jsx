import { useEffect, useState } from "react";
import { Image, Link, Edit2, Loader } from "lucide-react";
import { useBlogStore } from "../zustands/Blogs";

const CreateBlogPage = () => {
  const { CreateBlog, loading } = useBlogStore();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageFile: null, // base64 formatda saqlanadi
    imageUrl: "",
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageFile: reader.result, imageUrl: "" }); // base64 formatni saqlaymiz
      };
      reader.readAsDataURL(file); // Faylni base64 formatga o'qib olish
    }
  };

  const handleUrlUpload = (e) => {
    setFormData({ ...formData, imageUrl: e.target.value, imageFile: null });
  };

  useEffect(() => {
    if (formData.imageFile) {
      console.log("Uploaded image file:", formData.imageFile); // Bu yerda base64 format ko'rinishida chiqadi
    }
  }, [formData.imageFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CreateBlog(formData); // imageFile endi base64 formatda bo'ladi
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">
          Create New Blog
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Edit2 className="text-gray-500" />
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2 transition"
              required
            />
          </div>
          <div className="flex items-start space-x-2">
            <Edit2 className="text-gray-500 mt-1" />
            <textarea
              name="content"
              placeholder="Write your content here..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2 transition h-32 resize-none"
              required
            />
          </div>
          <div className="space-y-4">
            <p className="text-center font-medium text-gray-600">
              Add an Image:
            </p>

            <div className="flex items-center space-x-2">
              <Image className="text-gray-500" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full px-3 py-2 text-gray-600 bg-gray-100 rounded-md cursor-pointer"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Link className="text-gray-500" />
              <input
                type="url"
                placeholder="Or enter image URL"
                value={formData.imageUrl}
                onChange={handleUrlUpload}
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none px-3 py-2 transition"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {loading ? (
              <Loader className="animate-spin w-5 h-5" />
            ) : (
              "Publish Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPage;
