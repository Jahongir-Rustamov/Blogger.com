import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

export const createUser = create((set) => ({
  user: null,
  loading: false,
  checkAuthing: true,
  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    try {
      if (password !== confirmPassword) {
        set({ loading: false });
        return toast.error("Password don't match ❎");
      }
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
        confirmPassword,
      });

      set({ user: res.data, loading: false });
      toast.success("User successfully created 🎉");
    } catch (error) {
      console.log(error.message);
      set({ loading: false });
      toast.error("Error with something ⚠️");
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.delete("/auth/logout");
      set({ user: null, loading: false });
      toast.success("Successfully logOut ☣️");
    } catch (error) {
      console.log(error.message);
      set({ loading: false });
      toast.error("Error with something ⚠️");
    }
  },

  checkAuth: async () => {
    set({ checkAuthing: true });
    try {
      const res = await axios.get("/auth/authcheck");
      console.log("response:", res);
      set({ user: res.data.user, checkAuthing: false });
    } catch (error) {
      console.log(error.message);
      set({ checkAuthing: false });
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      console.log(res);
      set({ user: res.data, loading: false });
      toast.success("That's cool 🎉");
    } catch (error) {
      console.log(error.message);
      set({ loading: false });
      toast.error("Error with something ⚠️");
    }
  },
}));
