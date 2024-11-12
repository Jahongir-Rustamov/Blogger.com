import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";
export const useBlogStore = create((set) => ({
  blogs: [],
  loading: false,
  singleBlog: null,

  fetchBlogs: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/blog/getAllBlog");
      set({ blogs: response.data.data, loading: false });
    } catch (err) {
      console.log(err.message);
      set({ error: "Error fetching blogs", loading: false });
      toast.error("Error with something ⚠️");
    }
  },

  CreateBlog: async ({ title, content, imageFile, imageUrl }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/blog/create", {
        title,
        content,
        imageFile,
        imageUrl,
      });
      console.log(res);
      set((state) => ({
        blogs: [...state.blogs, res.data],
        loading: false,
      }));
      toast.success("Blog successfully created 🎉");
    } catch (error) {
      console.log(error.message);
      set({ error: "Error CreateBlog blogs", loading: false });
      toast.error("Error with something ⚠️");
    }
  },

  ReadMore: async (id) => {
    console.log(id);
    set({ loading: true });
    try {
      const res = await axios.get(`/blog/readmore/${id}`);
      console.log("Readmore:", res);
      set({ loading: false, singleBlog: res.data.data });
    } catch (error) {
      console.log(error.message);
      set({ error: "Error ReadMore blogs", loading: false });
      toast.error("Error with something ⚠️");
    }
  },

  getMyblogs: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/blog/myBlogs");
      set({ blogs: res.data.data, loading: false });
    } catch (error) {
      console.log(error.message);
      set({ error: "Error getMyblogs blogs", loading: false });
      toast.error("Error with something ⚠️");
    }
  },

  deleteBlog: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/blog/${id}`);
      set((PrevState) => ({
        blogs: PrevState.blogs.filter((blog) => blog._id !== id),
        loading: false,
      }));
      toast.success("Blog successfully deleted ✂️");
    } catch (error) {
      console.log(error.message);
      set({ error: "Error deleteBlog blogs", loading: false });
      toast.error("Error with something ⚠️");
    }
  },

  onUpdate: async ({ title, content, imageUrl }, id) => {
    set({ loading: true });
    try {
      await axios.put(`/blog/update/${id}`, {
        title,
        content,
        image: imageUrl,
      });

      set((prevState) => ({
        blogs: prevState.blogs.map((blog) =>
          blog._id === id ? { ...blog, title, content, image: imageUrl } : blog
        ),
        loading: false,
      }));

      toast.success("Blog successfully updated 🎉");
    } catch (error) {
      console.log(error.message);
      set({ error: "Error onUpdate blogs", loading: false });
      toast.error(error.message);
    }
  },
}));
