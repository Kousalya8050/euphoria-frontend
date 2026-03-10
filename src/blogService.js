// src/services/blogService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api";

// CREATE BLOG
export const createBlog = async (formData) => {
  const res = await axios.post(`${API_URL}/blogs`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// GET ALL BLOGS
export const getAllBlogs = async () => {
  const res = await axios.get(`${API_URL}/blogs_listing`);
  return res.data;
};

// GET BLOG BY SLUG ✅
export const getBlogBySlug = async (slug) => {
  const res = await axios.get(`${API_URL}/blogs/${slug}`);
  return res.data;
};
